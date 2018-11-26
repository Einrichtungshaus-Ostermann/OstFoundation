<?php declare(strict_types=1);

/**
 * Einrichtungshaus Ostermann GmbH & Co. KG - Foundation
 *
 * @package   OstFoundation
 *
 * @author    Tim Windelschmidt <tim.windelschmidt@ostermann.de>
 * @copyright 2018 Einrichtungshaus Ostermann GmbH & Co. KG
 * @license   proprietary
 */

namespace OstFoundation\CompilerPass;

use Shopware\Bundle\ControllerBundle\Listener\ControllerPathListener;
use Shopware\Components\Plugin;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

class RegisterNamespacedControllerCompilerPass implements CompilerPassInterface
{
    /**
     * ...
     */
    const MODULES = ['Backend', 'Frontend', 'Widgets', 'Api'];

    /**
     * @var Plugin[]
     */
    private $plugins;

    /**
     * @param Plugin[] $plugins
     */
    public function __construct(array $plugins)
    {
        $this->plugins = $plugins;
    }

    /**
     * @param ContainerBuilder $container
     */
    public function process(ContainerBuilder $container)
    {
        $paths = $this->collectControllerPaths($this->plugins);
        if (count($paths) === 0) {
            return;
        }
        $controllers = $this->getControllers($paths);
        if (count($controllers) === 0) {
            return;
        }
        $listener = new Definition(ControllerPathListener::class);
        foreach ($controllers as $eventName => $file) {
            $listener
                ->addTag(
                    'shopware.event_listener',
                    [
                        'event'    => $eventName,
                        'method'   => 'getControllerPath',
                        'priority' => 500,
                    ]
                )
                ->addMethodCall('addController', [$eventName, $file]);
        }
        $container->setDefinition('shopware.extended_generic_controller_listener', $listener);
    }

    /**
     * @param string[] $paths
     *
     * @return string[]
     */
    public function getControllers($paths)
    {
        $controllers = [];
        $finder = new Finder();
        $finder
            ->in($paths)
            ->files()
            ->name('*.php');
        foreach (self::MODULES as $module) {
            $finder->path($module);
        }
        foreach ($finder as $file) {
            $eventName = $this->buildEventName(
                $file->getPathInfo()->getBasename(),
                $file->getBasename('.php')
            );
            $controllers[$eventName] = $this->buildNamespacedController($file);
        }

        return $controllers;
    }

    /**
     * @param Plugin[] $actives
     *
     * @return string[]
     */
    private function collectControllerPaths($actives)
    {
        $controllerPaths = array_map(function (Plugin $plugin) {
            if (is_dir($plugin->getPath() . '/Controller')) {
                return $plugin->getPath() . '/Controller';
            }

            return null;
        }, $actives);

        return array_filter($controllerPaths);
    }

    /**
     * @param string $module
     * @param string $controller
     *
     * @return string
     */
    private function buildEventName($module, $controller)
    {
        return sprintf(
            'Enlight_Controller_Dispatcher_ControllerPath_%s_%s',
            $module,
            $controller
        );
    }

    /**
     * @param SplFileInfo $fileInfo
     *
     * @return string
     */
    private function buildNamespacedController(SplFileInfo $fileInfo)
    {
        $pathSplitted = explode(DIRECTORY_SEPARATOR, $fileInfo->getRealPath());

        return sprintf('%s\Controller\%s\%s',
            $pathSplitted[count($pathSplitted) - 4],
            $fileInfo->getPathInfo()->getBasename(),
            $fileInfo->getBasename('.php')
        );
    }
}