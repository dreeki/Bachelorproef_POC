using System;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

using TodoXamarin.Models;
using TodoXamarin.ViewModels;

namespace TodoXamarin.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class ItemDetailPage : ContentPage
    {
        ItemDetailViewModel viewModel;

        public ItemDetailPage(ItemDetailViewModel viewModel)
        {
            InitializeComponent();

            BindingContext = this.viewModel = viewModel;
        }

        public ItemDetailPage()
        {
            InitializeComponent();

            var item = new TodoItem
            {
				Id = Guid.NewGuid().ToString(),
                Author = "Item 1",
                Message = "This is an item description."
            };

            viewModel = new ItemDetailViewModel(item);
            BindingContext = viewModel;
        }

		async void EditItem_Clicked(object sender, EventArgs e)
        {
			var temp = new NewItemPage(viewModel.Item);
			await Navigation.PushModalAsync(new NavigationPage(temp));
        }
                                            
		async void DeleteItem_Clicked(object sender, EventArgs e)
        {
			MessagingCenter.Send(this, "DeleteItem", viewModel.Item.Id);
			await Navigation.PopAsync();
        }
    }
}