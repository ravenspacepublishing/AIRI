<?php 
function add_wayhut() {
	
	$ci =& get_instance();
	
	$curriculum_explorer= array('name'=>'Curriculum Explorer','description'=>'<b>An advanced display of book content.</b> A JSON file, that is the Media URL for this media-page drives this advanced display.','image'=>'views/melons/cantaloupe/images/view_media.gif');
	$ci->config->config['media_views']['curriculum_explorer'] = $curriculum_explorer;
	$ci->data['media_views']['curriculum_explorer'] = $curriculum_explorer;
	
	$ignore_pages = array('.edit', '.annotation_editor');
	foreach ($ignore_pages as $ignore) {
		if ($ignore == substr($ci->uri->uri_string, strlen($ignore)*-1)) return;
	}

	if ('system' == $ci->router->fetch_class()) return;
	
	$ci->template->add_css('system/application/hooks/wayhut/fonts.css');
	$ci->template->add_js('system/application/hooks/wayhut/custom.js');

	if ('as-i-remember-it' == $ci->data['book']->slug) {
		$ci->template->add_js('system/application/hooks/wayhut/custom-as-i-remember-it.js');
	};

	$ci->template->add_js('system/application/hooks/wayhut/jquery.magnific-popup.js');
	
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/reset.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/bootstrap.min.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/bootstrap-accessibility.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/common.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/scalarvis.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/header.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/widgets.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/responsive.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/timeline.min.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/timeline.theme.scalar.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/screen_print.css');

	$ci->template->add_css('system/application/hooks/wayhut/dist/styles.css');

	$ci->template->add_js('system/application/hooks/wayhut/share-this/share-this.js');
	$ci->template->add_css('system/application/hooks/wayhut/share-this/share-this.css');

	$ci->template->add_js('system/application/hooks/wayhut/share-this/sharers/twitter.js');
	$ci->template->add_js('system/application/hooks/wayhut/share-this/sharers/email.js');
	$ci->template->add_js('system/application/hooks/wayhut/share-this/sharers/facebook.js');

}
?>