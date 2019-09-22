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

namespace OstFoundation\Setup;

use Exception;
use Shopware\Bundle\AttributeBundle\Service\CrudService;
use Shopware\Components\Model\ModelManager;
use Shopware\Components\Plugin;
use Shopware\Components\Plugin\Context\InstallContext;

class Install
{
    /**
     * ...
     *
     * @var array
     */
    public static $attributes = [
        's_articles_attributes' => [
            [
                'column' => 'attr1',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM Firma',
                    'helpText'         => 'IWM Firma',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 1
                ]
            ],
            [
                'column' => 'attr2',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM HWG',
                    'helpText'         => 'IWM Hauptwarengruppe',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 2
                ]
            ],
            [
                'column' => 'attr3',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM UWG',
                    'helpText'         => 'IWM Unterwarengruppe',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 3
                ]
            ],
            [
                'column' => 'attr4',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM System',
                    'helpText'         => 'IWM System',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 4
                ]
            ],
            [
                'column' => 'attr5',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM Warenpool',
                    'helpText'         => 'IWM Warenpool',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 5
                ]
            ],
            [
                'column' => 'attr9',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM Hersteller Artikelnummer',
                    'helpText'         => 'IWM Hersteller Artikelnummer',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 9
                ]
            ],
            [
                'column' => 'attr11',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM Dispo',
                    'helpText'         => 'IWM Dispo',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 11
                ]
            ],
            [
                'column' => 'attr12',
                'type'   => 'integer',
                'data'   => [
                    'label'            => 'IWM Lieferzeit',
                    'helpText'         => 'IWM Lieferzeit in Wochen',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 12
                ]
            ],
            [
                'column' => 'attr13',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM Versandart',
                    'helpText'         => 'IWM Versandart',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 13
                ]
            ],
            [
                'column' => 'attr14',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM Versand Addition',
                    'helpText'         => 'IWM Versand Addition',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 14
                ]
            ],
            [
                'column' => 'attr15',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM Versandkosten',
                    'helpText'         => 'IWM Versandkosten',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 15
                ]
            ],
            [
                'column' => 'attr16',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM Montagekosten',
                    'helpText'         => 'IWM Montagekosten',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 16
                ]
            ],
            [
                'column' => 'attr18',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM Etikettenart',
                    'helpText'         => 'IWM Etikettenart',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 18
                ]
            ],
            [
                'column' => 'attr20',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'IWM SEO Name',
                    'helpText'         => 'IWM SEO Name',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 20
                ]
            ],
            [
                'column' => 'stock_wit',
                'type'   => 'integer',
                'data'   => [
                    'label'            => 'IWM Bestand Witten',
                    'helpText'         => 'IWM Bestand Witten',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 40
                ]
            ],
            [
                'column' => 'stock_bot',
                'type'   => 'integer',
                'data'   => [
                    'label'            => 'IWM Bestand Bottrop',
                    'helpText'         => 'IWM Bestand Bottrop',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 41
                ]
            ],
            [
                'column' => 'stock_haa',
                'type'   => 'integer',
                'data'   => [
                    'label'            => 'IWM Bestand Haan',
                    'helpText'         => 'IWM Bestand Haan',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 42
                ]
            ],
            [
                'column' => 'stock_rec',
                'type'   => 'integer',
                'data'   => [
                    'label'            => 'IWM Bestand Recklinghausen',
                    'helpText'         => 'IWM Bestand Recklinghausen',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 43
                ]
            ],
            [
                'column' => 'stock_lev',
                'type'   => 'integer',
                'data'   => [
                    'label'            => 'IWM Bestand Leverkusen',
                    'helpText'         => 'IWM Bestand Leverkusen',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 44
                ]
            ],
            [
                'column' => 'exhibit_wit',
                'type'   => 'boolean',
                'data'   => [
                    'label'            => 'IWM Ausstellung Witten',
                    'helpText'         => 'IWM Ausstellung Witten',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 50
                ]
            ],
            [
                'column' => 'exhibit_bot',
                'type'   => 'boolean',
                'data'   => [
                    'label'            => 'IWM Ausstellung Bottrop',
                    'helpText'         => 'IWM Ausstellung Bottrop',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 51
                ]
            ],
            [
                'column' => 'exhibit_haa',
                'type'   => 'boolean',
                'data'   => [
                    'label'            => 'IWM Ausstellung Haan',
                    'helpText'         => 'IWM Ausstellung Haan',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 52
                ]
            ],
            [
                'column' => 'exhibit_rec',
                'type'   => 'boolean',
                'data'   => [
                    'label'            => 'IWM Ausstellung Recklinghausen',
                    'helpText'         => 'IWM Ausstellung Recklinghausen',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 53
                ]
            ],
            [
                'column' => 'exhibit_lev',
                'type'   => 'boolean',
                'data'   => [
                    'label'            => 'IWM Ausstellung Leverkusen',
                    'helpText'         => 'IWM Ausstellung Leverkusen',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 54
                ]
            ],
            [
                'column' => 'attr7',
                'type'   => 'integer',
                'data'   => [
                    'label'            => 'Typenplan ID',
                    'helpText'         => 'Typenplan ID - Plugin OstArticleFamily',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 67
                ]
            ],
            [
                'column' => 'attr8',
                'type'   => 'float',
                'data'   => [
                    'label'            => 'Versandkosten',
                    'helpText'         => 'Berechnete Versandkosten - Plugin OstArticleShippingCosts',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 68
                ]
            ],
            [
                'column' => 'attr19',
                'type'   => 'string',
                'data'   => [
                    'label'            => 'Dokumente IDs',
                    'helpText'         => 'Dokumente IDs - Plugin OstArticleDocuments',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 79
                ]
            ],
            [
                'column' => 'tpl_color_badge',
                'type'   => 'boolean',
                'data'   => [
                    'label'            => 'Farbfächer anzeigen',
                    'helpText'         => 'Farbfächer anzeigen - Theme',
                    'translatable'     => false,
                    'displayInBackend' => true,
                    'custom'           => true,
                    'position'         => 90
                ]
            ],
        ]
    ];

    /**
     * Main bootstrap object.
     *
     * @var Plugin
     */
    protected $plugin;

    /**
     * ...
     *
     * @var InstallContext
     */
    protected $context;

    /**
     * ...
     *
     * @var ModelManager
     */
    protected $modelManager;

    /**
     * ...
     *
     * @var CrudService
     */
    protected $crudService;

    /**
     * ...
     *
     * @var string
     */
    protected $pluginDir;

    /**
     * ...
     *
     * @param Plugin         $plugin
     * @param InstallContext $context
     * @param ModelManager   $modelManager
     * @param CrudService    $crudService
     */
    public function __construct(Plugin $plugin, InstallContext $context, ModelManager $modelManager, CrudService $crudService)
    {
        // set params
        $this->plugin = $plugin;
        $this->context = $context;
        $this->modelManager = $modelManager;
        $this->crudService = $crudService;
        $this->pluginDir = $plugin->getPath();
    }

    /**
     * ...
     *
     * @throws \Exception
     */
    public function install()
    {
        // backend and ajax configuration
        $this->installSql('001');

        // performance settings
        $this->installSql('002');

        // category configuration
        $this->installSql('003');

        // registration configuration
        $this->installSql('004');

        // article reviews configuration
        $this->installSql('005');

        // search configuration
        $this->installSql('006');

        // esd configuration
        $this->installSql('007');

        // media settings
        $this->installSql('008');
    }

    /**
     * ...
     *
     * @param string $version
     */
    private function installSql($version)
    {
        // get the sql query for this update
        $sql = @file_get_contents(rtrim($this->pluginDir, '/') . '/Setup/Install/install-' . $version . '.sql');

        // execute the query and catch any db exception and ignore it
        try {
            Shopware()->Db()->exec($sql);
        } catch (Exception $exception) {
        }
    }
}
