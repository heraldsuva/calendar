<?php
 
declare(strict_types=1);
 
/*
* Include necessary files
*/
include_once '../sys/core/init.inc.php';

/*
* Output the header
*/
$page_title = "Add/Edit Event";
$css_files = array("style.css", "admin.css");
include_once 'assets/common/header.inc.php';
 
/*
* Load the calendar
*/
$cal = new Calendar($dbo);
/*
* Check if an ID was passed
*/
if ( isset($_POST['event_id']) ){
    $id = (int) $_POST['event_id'];
    // Force integer type to sanitize data
}
else{
    $id = NULL;
}

/*
* Instantiate the headline/submit button text
*/
$submit = "Create a New Event";

/*
* If no ID is passed, start with an empty event object.
 * 
 */

/*
* Otherwise load the associated event
*/
if ( !empty($id) ){
    $event = $this->_loadEventById($id);
    /*
    * If no object is returned, return NULL
    */
    if ( !is_object($event) ) { return NULL; }

    $submit = "Edit This Event";
}
?>
 
<div id="content">
    <form action="assets/inc/process.inc.php" method="post">
        <fieldset>
            <legend><?php echo $submit ?></legend>

            <label for="event_title">Event Title</label>
            <input type="text" name="event_title" id="event_title" value="<?php echo $event->title ?>" />

            <label for="event_start">Start Time</label>
            <input type="text" name="event_start" id="event_start" value="<?php echo $event->start ?>" />

            <label for="event_end">End Time</label>
            <input type="text" name="event_end" id="event_end" value="<?php echo $event->end ?>" />

            <label for="event_description">Event Description</label>
            <textarea name="event_description" id="event_description"><?php echo $event->description ?></textarea>

            <input type="hidden" name="event_id" value="<?php echo $event->id ?>" />
            <input type="hidden" name="token" value="<?php echo $_SESSION['token'] ?>" />
            <input type="hidden" name="action" value="event_edit" />
            <input type="submit" name="event_submit" value="<?php echo $submit ?>" /> or <a href="./">cancel</a>
        </fieldset>
    </form>
</div><!-- end #content -->
 
<?php include_once 'assets/common/footer.inc.php'; ?>