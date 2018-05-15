using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Linq;
using Xamarin.Forms;

using TodoXamarin.Models;
using TodoXamarin.Views;

namespace TodoXamarin.ViewModels
{
    public class ItemsViewModel : BaseViewModel
    {
        public ObservableCollection<TodoItem> Items { get; set; }
        public Command LoadItemsCommand { get; set; }

        public ItemsViewModel()
        {
            Title = "Todo List";
            Items = new ObservableCollection<TodoItem>();
            LoadItemsCommand = new Command(async () => await ExecuteLoadItemsCommand());

            MessagingCenter.Subscribe<NewItemPage, TodoItem>(this, "AddItem", async (obj, item) =>
            {
				var _item = item as TodoItem;
				//geef item een id
				_item.Id = Guid.NewGuid().ToString();
				Items.Insert(0, _item);
                await DataStore.AddItemAsync(_item);
            });

			MessagingCenter.Subscribe<NewItemPage, TodoItem>(this, "EditItem", async (obj, item) =>
            {
                var _item = item as TodoItem;
				var old = Items.FirstOrDefault((TodoItem t) => t.Id == _item.Id);
				Items.Remove(old);
				Items.Insert(0, _item);
				await DataStore.UpdateItemAsync(_item);
            });

			MessagingCenter.Subscribe<ItemDetailPage, String>(this, "DeleteItem", async (obj, id) =>
            {
				
                var _id = id as String;
                var item = Items.FirstOrDefault((TodoItem t) => t.Id == _id);
                Items.Remove(item);
				await DataStore.DeleteItemAsync(_id);
            });
        }
        
        async Task ExecuteLoadItemsCommand()
        {
            if (IsBusy)
                return;

            IsBusy = true;

            try
            {
                Items.Clear();
                var items = await DataStore.GetItemsAsync(true);
                foreach (var item in items)
                {
                    Items.Add(item);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
            finally
            {
                IsBusy = false;
            }
        }
    }
}