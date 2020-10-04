<?php
function projectx_post_types() {
  // Car Model Post Type
  register_post_type('car', array(
    'show_in_rest' => true,
    'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
    'rewrite' => array('slug' => 'cars'),
    'has_archive' => true,
    'public' => true,
    'labels' => array(
      'name' => 'Cars',
      'add_new_item' => 'Add New Car',
      'edit_item' => 'Edit Car',
      'all_items' => 'All Cars',
      'singular_name' => 'Car'
    'menu_icon' => 'dashicons-car'
  ));
}

add_action('init', 'projectx_post_types');