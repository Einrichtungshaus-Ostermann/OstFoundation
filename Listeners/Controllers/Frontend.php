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

namespace OstFoundation\Listeners\Controllers;

use Enlight_Event_EventArgs as EventArgs;
use Enlight_Controller_Action as Controller;

class Frontend
{

    /**
	 * ...
	 *
	 * @var string
	 */

	protected $viewDir;



    /**
     * ...
     *
     * @var array
     */

    protected $configuration;



    /**
	 * ...
	 *
	 * @param string           $viewDir
     * @param array            $configuration
	 */

	public function __construct( $viewDir, array $configuration )
	{
		// set params
		$this->viewDir        = $viewDir;
		$this->configuration  = $configuration;
	}



    /**
     * ...
     *
     * @param EventArgs   $arguments
     *
     * @return void
     */

    public function onPostDispatch( EventArgs $arguments )
    {
        // get the controller
        /* @var $controller Controller */
        $controller = $arguments->get( "subject" );

        // get parameters
        $request    = $controller->Request();
        $view       = $controller->View();

        // assign configuration
        $view->assign( "ostFoundationConfiguration", $this->configuration );
    }




}
