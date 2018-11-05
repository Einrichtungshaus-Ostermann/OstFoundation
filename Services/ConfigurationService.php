<?php declare(strict_types=1);
/**
 * Einrichtungshaus Ostermann GmbH & Co. KG - Foundation
 *
 * Foundation
 *
 * @package   OstFoundation
 *
 * @author    Eike Brandt-Warneke <e.brandt-warneke@ostermann.de>
 * @copyright 2018 Einrichtungshaus Ostermann GmbH & Co. KG
 * @license   proprietary
 */

namespace OstFoundation\Services;

use Doctrine\ORM\ORMException;
use Shopware\Bundle\StoreFrontBundle\Service\ContextServiceInterface;
use Shopware\Components\Model\ModelManager;
use Shopware\Components\Plugin\CachedConfigReader;
use Shopware\Models\Shop\Shop;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ConfigurationService implements ConfigurationServiceInterface
{
    /**
     * @var ModelManager
     */
    private $modelManager;



    /**
     * @var ContextServiceInterface
     */
    private $contextService;



    /**
     * @var CachedConfigReader
     */
    private $cachedConfigReader;



    /**
     * @var ContainerInterface
     */
    private $container;



    /**
     * ...
     *
     * @param ModelManager $modelManager
     * @param ContextServiceInterface $contextService
     * @param CachedConfigReader $cachedConfigReader
     */
    public function __construct(ModelManager $modelManager, ContextServiceInterface $contextService, CachedConfigReader $cachedConfigReader, ContainerInterface $container)
    {
        $this->modelManager = $modelManager;
        $this->contextService = $contextService;
        $this->cachedConfigReader = $cachedConfigReader;
        $this->container = $container;
    }



    public function getConfig(string $pluginName): array
    {
        $shopIsInitialized = $this->container->initialized('shop');

        $shop = null;
        if ($shopIsInitialized) {
            try {
                $shop = $this->modelManager->find(
                    Shop::class,
                    $this->contextService->getShopContext()->getShop()->getId()
                );
            } catch (ORMException $e) {
            }
        }

        return $this->cachedConfigReader->getByPluginName($pluginName, $shop);
    }

}
