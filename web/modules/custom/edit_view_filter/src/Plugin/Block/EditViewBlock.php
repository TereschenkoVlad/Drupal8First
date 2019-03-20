<?php

/**
 * @file
 * Contains \Drupal\edit_view_filter\Plugin\Block\EditViewBlock.
 */

namespace Drupal\edit_view_filter\Plugin\Block;
use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'EditView' Block
 *
 * @Block(
 *   id = "edit_view_block",
 *   admin_label = @Translation("Edit View block"),
 * )
 */

class EditViewBlock extends BlockBase {
    /**
     * {@inheritdoc}
     */
    public function build() {
        return array(
            '#markup' => $this->t('Hello, World!'),
        );
    }
}