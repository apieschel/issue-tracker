 $(function() {
    $('#testForm').submit(function(e) {
      $.ajax({
        url: '/api/issues/apitest',
        type: 'post',
        data: $('#testForm').serialize(),
        success: function(data) {
          $('#jsonResult').text(JSON.stringify(data));
        }
      });
      e.preventDefault();
    });
    $('#testForm2').submit(function(e) {
      $.ajax({
        url: '/api/issues/apitest',
        type: 'put',
        data: $('#testForm2').serialize(),
        success: function(data) {
          $('#jsonResult').text(JSON.stringify(data));
        }
      });
      e.preventDefault();
    });
    $('#testForm3').submit(function(e) {
      $.ajax({
        url: '/api/issues/apitest',
        type: 'delete',
        data: $('#testForm3').serialize(),
        success: function(data) {
          $('#jsonResult').text(JSON.stringify(data));
        }
      });
      e.preventDefault();
    });
   
    let currentProject = window.location.pathname.replace(/\//g, "");
    let url = "/api/issues/"+currentProject;
   
    $('#projectTitle').text('All issues for: '+currentProject)
    $.ajax({
      type: "GET",
      url: url,
      success: function(data)
      {
        let issues= [];
        data.forEach(function(ele) {
          let openstatus;
          (ele.open) ? openstatus = 'open' : openstatus = 'closed';
          let single = [
            '<div class="issue '+openstatus+'">',
            '<p class="id">id: '+ele._id+'</p>',
            '<h3>'+ele.title+' -  ('+openstatus+')</h3>',
            '<br>',
            '<p>'+ele.text+'</p>',
            '<p>'+ele.status+'</p>',
            '<br>',
            '<p class="id"><b>Created by:</b> '+ele.created_by+'  <b>Assigned to:</b> '+ele.assigned_to,
            '<p class="id"><b>Created on:</b> '+ele.createdAt+'  <b>Last updated:</b> '+ele.updatedAt,
            '<br><a href="#" class="closeIssue" id="'+ele._id+'">close?</a> <a href="#" class="deleteIssue" id="'+ele._id+'">delete?</a>',
            '</div>'

          ];
          issues.push(single.join(''));
        });
        $('#issueDisplay').html(issues.join(''));
      }
    });

    $('#newIssue').submit(function(e){
      e.preventDefault();
      $(this).attr('action', "/api/issues/" + currentProject);
      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function(data) { window.location.reload(true); }
      });
    });

    $('#issueDisplay').on('click','.closeIssue', function(e) {
      var url = "/api/issues/"+currentProject;
      $.ajax({
        type: "PUT",
        url: url,
        data: {_id: $(this).attr('id'), open: false},
        success: function(data) { alert(data); window.location.reload(true); }
      });
      e.preventDefault();
    });
   
    $('#issueDisplay').on('click','.deleteIssue', function(e) {
      var url = "/api/issues/"+currentProject;
      $.ajax({
        type: "DELETE",
        url: url,
        data: {_id: $(this).attr('id')},
        success: function(data) { alert(data); window.location.reload(true); }
      });
      e.preventDefault();
    }); 
});