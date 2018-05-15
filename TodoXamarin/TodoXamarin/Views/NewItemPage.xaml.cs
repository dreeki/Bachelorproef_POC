using System;
using System.Collections.Generic;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

using TodoXamarin.Models;

namespace TodoXamarin.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NewItemPage : ContentPage
    {
        public TodoItem Item { get; set; }
		public bool IsNew { get; set; }

        public NewItemPage()
        {
            InitializeComponent();

            Item = new TodoItem
            {
                Author = "Author",
                Message = "Message"
            };

			IsNew = true;

            BindingContext = this;
        }

		public NewItemPage(TodoItem item)
        {
            InitializeComponent();

			Item = item;

			IsNew = false;

            BindingContext = this;
        }

        async void Save_Clicked(object sender, EventArgs e)
        {
			String crudOperation = "AddItem";
			if(!IsNew){
				crudOperation = "EditItem";
			}
			MessagingCenter.Send(this, crudOperation, Item);
            await Navigation.PopModalAsync();
        }
    }
}