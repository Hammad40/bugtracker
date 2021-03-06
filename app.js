document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
	var issueTitle = document.getElementById('issueTitleInput').value;
	var issueDesc = document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	var issueId = chance.guid();
	var issueStatus = 'Open';

	var issue = {
		id: issueId,
		title: issueTitle,
		description: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issueStatus,
	}

	if (localStorage.getItem('issues') == null) {
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues))
	} else {
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}

	document.getElementById('issueInputForm').reset();

	fetchIssues();

	e.preventDefault();
}

function setStatusClosed(id) {
	var issues = JSON.parse(localStorage.getItem('issues'));

	for (var i = 0; i < issues.length; i++) {
		if (issues[i].id == id) {
			issues[i].status = 'Closed';
		}
	}


	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
}

function deleteIssue(id) {
	var issues = JSON.parse(localStorage.getItem('issues'));

	for (var i = 0; i < issues.length; i++) {
		if (issues[i].id == id) {
			issues.splice(i, 1);
		}
	}


	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
}

function fetchIssues() {
	var issues = JSON.parse(localStorage.getItem('issues'));
	var issuesListe = document.getElementById('issuesList');

	issuesList.innerHTML = '';

	for (var i = 0; i < issues.length; i++){
		var id = issues[i].id;
		var title = issues[i].title;
		var desc = issues[i].description;
		var severity = issues[i].severity;
		var assignedTo = issues[i].assignedTo;
		var status = issues[i].status;

		issuesList.innerHTML += '<div class="ards">'+
								'<h6>Ticket Number: ' + id + '</h6>'+
								'<p><span class= "label label-info">' + status + '</span></p>'+
								'<h3>' + "Title: " + title + '</h3>'+
								'<h6 class="descriptionLong">' + "Issue:  " + desc + '</h6>'+
								'<p><span class= "glyphicon glyphicon-time"></span>' + "severity: " + severity + '</p>'+
								'<p><span class= "glyphicon glyphicon-user"></span>' + "Assigned To: " + assignedTo + '</p>'+
								'<a href="#" onClick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>'+
								'<a href="#" onClick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
								'</div>';


	}
}