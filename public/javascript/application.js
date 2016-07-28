$(document).ready(function() {
  listContacts();
  var $form = $('.createContact').hide();
  var $nameInput = $form.find('#nameInput');
  var $emailInput = $form.find('#emailInput');

  var $listContainer = $('.list').on('click', '.view', function(){
    showContact($(this).closest('.contact').attr('data-id')).then(function(contact){
      console.log(contact);
      var $list = $('.list');
      $list.html('');
      var li = $('<li class="contact" data-id="'+ contact.id +'">').append(contact.name + " " + contact.email + "<button class='btn view'>View</button><button class='btn delete'>Delete</button>");
      li.appendTo('.list');
    });    
  });

  $listContainer.on('click', '.delete', function(){
    deleteContact($(this).closest('.contact').attr('data-id')).then(function(contacts){
      listContacts();
    });
  });

  var $searchInput = $("#query").on('keyup', function(){
    searchContacts($(this).val()).then(function(contacts){
      print(contacts);
    });
  });

  var $newContact = $('.new').on('click', '.newBtn', function(){
    var $self = $(this).hide();
    $form.show();
    $nameInput.focus();
     $form.on('submit', function(){
      addContact($nameInput.val(), $emailInput.val()).then(function(){
        $form.hide();
        $self.show();
        return listContacts();

      });
      return false;
    });
  });


  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});

// Function to list all contacts
function listContacts(){
  return $.get("/contacts", function(data){
   return print(data);
  });
};

// function to search through contacts
function searchContacts(query){
 return $.get("/contacts?query=" + query)
};

// function to view single contact
function showContact(id){
  return $.get("/contact/"+ id);
};

// function to delete a contact
function deleteContact(id){
  return $.ajax({url: "/contact/"+ id, type: 'delete'});
};

function addContact(name, email){
  return $.post("contact/new", {name: name, email: email});
};

function print(contacts){
  var $list = $('.list');
  $list.html('');
    $.each(contacts, function(index, contact){
       // $('.list').append("<article class='contact' data-id='"+ contact.id +"'>" + contact.id +") Name: " + contact.name + " Email: " + contact.email + "</article>");
      var li = $('<li class="contact" data-id="'+ contact.id +'">').append(contact.name + " " + contact.email + "<button class='btn view'>View</button><button class='btn delete'>Delete</button>");
      li.appendTo('.list');
    });
}
