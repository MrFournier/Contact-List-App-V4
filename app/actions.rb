# Homepage (Root path)
get '/' do
  erb :index
end

# Listing all contacts
get '/contacts' do
  content_type :json
  contacts = Contact.all
  if params['query']
    contacts = contacts.where('name LIKE ?', "%#{params['query']}%")
  end
  contacts.to_json
end

# Viewing a contact
get '/contact/:id' do
  content_type :json
  contact = Contact.find(params[:id])

  if contact
    contact.to_json
  else
    status 404
  end
end

# Creating a new contact
post '/contact/new' do
  content_type :json
  contact = Contact.create(name: params[:name], email: params[:email])
  status 201
  contact.to_json
end

# Delete a contact. (not sure if this is correct)
delete '/contact/:id' do
  content_type :json
  contact = Contact.find(params[:id])

  if contact
    contact.destroy
    contact.to_json
  else
    status 404
  end
end
