<?php 
function add_wayhut() {
	
	$ci =& get_instance();

	$ignore_pages = array('.edit', '.annotation_editor');
	foreach ($ignore_pages as $ignore) {
		if ($ignore == substr($ci->uri->uri_string, strlen($ignore)*-1)) return;
	}

	if ('system' == $ci->router->fetch_class()) return;

	$ci->template->add_js('system/application/hooks/wayhut/custom.js');

	$ci->template->add_css('system/application/views/melons/cantaloupe/css/reset.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/bootstrap.min.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/bootstrap-accessibility.css');
	// $ci->template->add_css('system/application/views/melons/cantaloupe/css/common.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/scalarvis.css');
	// $ci->template->add_css('system/application/views/melons/cantaloupe/css/header.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/widgets.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/responsive.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/timeline.min.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/timeline.theme.scalar.css');
	$ci->template->add_css('system/application/views/melons/cantaloupe/css/screen_print.css');

	$ci->template->add_css('system/application/hooks/wayhut/dist/styles.css');

	// $ci->template->block('system/application/views/melons/cantaloupe/css/reset.css', 'css');
	// $ci->template->block('system/application/views/melons/cantaloupe/css/bootstrap.min.css', 'css');
	// $ci->template->block('system/application/views/melons/cantaloupe/css/bootstrap-accessibility.css', 'css');
	$ci->template->block('system/application/views/melons/cantaloupe/css/common.css', 'css');
	// $ci->template->block('system/application/views/melons/cantaloupe/css/scalarvis.css', 'css');
	$ci->template->block('system/application/views/melons/cantaloupe/css/header.css', 'css');
	// $ci->template->block('system/application/views/melons/cantaloupe/css/widgets.css', 'css');
	// $ci->template->block('system/application/views/melons/cantaloupe/css/responsive.css', 'css');
	// $ci->template->block('system/application/views/melons/cantaloupe/css/timeline.min.css', 'css');
	// $ci->template->block('system/application/views/melons/cantaloupe/css/timeline.theme.scalar.css', 'css');
	// $ci->template->block('system/application/views/melons/cantaloupe/css/screen_print.css', 'css');

}
?>