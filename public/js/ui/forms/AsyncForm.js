/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {

    if(!element) {
      throw new Error('Element is not found!')
    }

    this.element = element
    this.registerEvents()

  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {

    this.element.addEventListener('submit', (e) => {
      e.preventDefault()
      this.submit()
    })

  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {

    const input = this.element.querySelectorAll('.form-control')
    let data = {}
    input.forEach(e => {
      data[e.name] = e.value
    })
    // for (let item of input) {
    //   data[item.name] = item.value
    // }
    return data
  }

  onSubmit(options){

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    let options = this.getData()
    this.onSubmit(options)
  }
}