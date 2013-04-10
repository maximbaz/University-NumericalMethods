class window.AppViewModel
    constructor: ->
        @labs = new LabsListViewModel
        @contacts = new ContactsListViewModel
        @flash = new Flash

