<?php declare(strict_types=1);

/**
 * Einrichtungshaus Ostermann GmbH & Co. KG - Foundation
 *
 * @package   OstFoundation
 *
 * @author    Eike Brandt-Warneke <e.brandt-warneke@ostermann.de>
 * @copyright 2018 Einrichtungshaus Ostermann GmbH & Co. KG
 * @license   proprietary
 */

namespace OstFoundation\Services;

interface ConfigurationServiceInterface
{
    /**
     * ...
     *
     * @param string $pluginName
     *
     * @return array
     */
    public function getConfig(string $pluginName): array;
}
