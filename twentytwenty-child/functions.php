<?php
	add_action( 'wp_enqueue_scripts', 'tt_child_enqueue_scripts' );

    function tt_child_enqueue_scripts() {
        load_bootstrap_cdn();
        load_swiper_cdn();
        tt_child_enqueue_parent_styles();
        wp_enqueue_script('carousel',get_template_directory_uri() . '-child/assets/js/customCarousel.js', NULL, $theme_version, true);
    }

	function tt_child_enqueue_parent_styles() {
        wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );
        wp_enqueue_style( 'parent-rtl-style', get_template_directory_uri().'/style-rtl.css' );

    }

    function load_bootstrap_cdn() {
        wp_enqueue_script('pooper', "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js", NULL, '1.0', true);
        wp_enqueue_Script('jQuery', "https://code.jquery.com/jquery-3.5.1.slim.min.js", NULL, '1.0', true);
        wp_enqueue_script('bootstrap-js', "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js", NULL, '1.0', true);
        wp_enqueue_style('bootstrap-css', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css');
    }

    function load_swiper_cdn() {
        wp_enqueue_script('swiper-js', "https://unpkg.com/swiper/swiper-bundle.min.js", NULL, '1.0', true);
        wp_enqueue_style('swiper-css', "https://unpkg.com/swiper/swiper-bundle.min.css");
    }