<?php
/**
 * @file
 * Contains \Drupal\edit_view_filter\Controller\FilterViewController.
 */

namespace Drupal\edit_view_filter\Controller;

use Drupal\Core\Controller\ControllerBase;

class FilterViewController extends ControllerBase {
    public function content() {
        return array(
            '#type' => 'markup',
            '#markup' => t('Hello world'),
        );
    }
}