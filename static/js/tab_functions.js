function openProject(evnt, projectName) {
    var i, tabContent, tabLinks;

    // Get all the elements who have tabcontent and hide them
    tabContent = document.getElementsByClassName("tabContent");

    for (i = 0; i < tabContent.length; i++) { 
        tabContent[i].style.display = "none";
    }

    // Get all the elements with class="tablinks" and remove the class "active"
    tabLinks = document.getElementsByClassName("project__tablink")
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    //Show the current tab, and add an "active" class to the link tha opened that tab
    document.getElementById(projectName).style.display = "block";
    if (evnt) evnt.classList.add("active");
}

// Trigger the default tab open when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('defaultOpen').click(); // Click the default tab
});
