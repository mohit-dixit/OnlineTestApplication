<style src="./../../assets/dashboardfiles/reset.css"></style>
<style src="./../../assets/dashboardfiles/grid.css"></style>
<style src="./../../assets/dashboardfiles/styles.css"></style>
<style src="./../../assets/dashboardfiles/jquery.wysiwyg.css"></style>
<style src="./../../assets/dashboardfiles/tablesorter.css"></style>
<style src="./../../assets/dashboardfiles/thickbox.css"></style>
<style src="./../../assets/dashboardfiles/theme-blue.css"></style>

<script type="text/javascript" src="jquery-1.3.2.min.js" tppabs="http://www.xooom.pl/work/magicadmin/js/jquery-1.3.2.min.js">
</script>
		<!-- JQuery WYSIWYG plugin script -->
<script type="text/javascript" src="jquery.wysiwyg.js" tppabs="http://www.xooom.pl/work/magicadmin/js/jquery.wysiwyg.js">
</script>
        <!-- JQuery tablesorter plugin script-->
<script type="text/javascript" src="jquery.tablesorter.min.js" tppabs="http://www.xooom.pl/work/magicadmin/js/jquery.tablesorter.min.js">
</script>
		<!-- JQuery pager plugin script for tablesorter tables -->
<script type="text/javascript" src="jquery.tablesorter.pager.js" tppabs="http://www.xooom.pl/work/magicadmin/js/jquery.tablesorter.pager.js">
</script>
		<!-- JQuery password strength plugin script -->
<script type="text/javascript" src="jquery.pstrength-min.1.2.js" tppabs="http://www.xooom.pl/work/magicadmin/js/jquery.pstrength-min.1.2.js">
</script>
		<!-- JQuery thickbox plugin script -->
<script type="text/javascript" src="thickbox.js" tppabs="http://www.xooom.pl/work/magicadmin/js/thickbox.js">
</script>
    <!-- Initiate WYIWYG text area -->
<script type="text/javascript">
  $(function() {
    $('#wysiwyg').wysiwyg({
      controls: {
        separator01: {
          visible: true
        },
        separator03: {
          visible: true
        },
        separator04: {
          visible: true
        },
        separator00: {
          visible: true
        },
        separator07: {
          visible: false
        },
        separator02: {
          visible: false
        },
        separator08: {
          visible: false
        },
        insertOrderedList: {
          visible: true
        },
        insertUnorderedList: {
          visible: true
        },
        undo: {
          visible: true
        },
        redo: {
          visible: true
        },
        justifyLeft: {
          visible: true
        },
        justifyCenter: {
          visible: true
        },
        justifyRight: {
          visible: true
        },
        justifyFull: {
          visible: true
        },
        subscript: {
          visible: true
        },
        superscript: {
          visible: true
        },
        underline: {
          visible: true
        },
        increaseFontSize: {
          visible: false
        },
        decreaseFontSize: {
          visible: false
        }
      }
    });
  });
</script>
        <!-- Initiate tablesorter script -->
<script type="text/javascript">
  $(document).ready(function() {
    $("#myTable")
      .tablesorter({
        // zebra coloring
        widgets: ['zebra'],
        // pass the headers argument and assing a object
        headers: {
          // assign the sixth column (we start counting zero)
          6: {
            // disable it by setting the property sorter to false
            sorter: false
          }
        }
      })
      .tablesorterPager({
        container: $("#pager")
      });
  });
</script>
        <!-- Initiate password strength script -->
<script type="text/javascript">
  $(function() {
    $('.password').pstrength();
  });
</script>

<template src="./Dashboard.component.html">
</template>
<script src="./Dashboard.component.js">
</script>
<style src="./Dashboard.component.css" scoped>
</style>

