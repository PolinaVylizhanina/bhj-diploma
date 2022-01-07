/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    //this.element = element
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if(response.success) {
        let selectAccounts = this.element.querySelector('.accounts-select')
        selectAccounts.innerHTML = ''
        response.data.forEach(e => {
          selectAccounts.insertAdjacentHTML('beforeend', `<option value="${e.id}">${e.name}</option>`)          
        });
      }
    })

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {

    this.element.closest('#modal-new-income') ? data.type = 'income' : data.type = 'expense';
   
    Transaction.create(data, (err, response) => {
      if(response.success) {
        App.update()        
        this.element.reset() 
        App.getModal((data.type === 'income') ? 'newIncome' : 'newExpense').close()  
                
      } else {
        alert(response.error)
      }
    })

  }
}