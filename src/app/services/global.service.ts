import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Title } from '@angular/platform-browser';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public urlApi: string;
  public windowWidth;
  public produccion;
  public deviceInfo;
  public topMenuHeight;
  public maxWidthWindow;
  public tittlePage;
  public keysScroll;
  public environment;

  constructor(
    private router: Router,
    private deviceDetectorService: DeviceDetectorService,
    private titleService: Title
  ) {
    this.maxWidthWindow = 800;

    this.environment = environment;

    /* this.environment.urlApi = 'https://comunitouch.com/api';
    this.environment.urlApp = 'http://localhost:4200';
    this.environment.qa = true;
    this.environment.production = true; */

    this.urlApi = environment.urlApi;

    /* if (window.location.origin === '') {
      this.environment = environment;

      this.environment.urlApi = 'https://professordemo.wiico.net/api';
      this.environment.urlApp = 'https://demo.wiico.net';
      this.environment.qa = true;
      this.environment.production = true;

      this.urlApi = this.environment.urlApi;
    } */

    this.produccion = environment.production;

    this.keysScroll = { 37: 1, 38: 1, 39: 1, 40: 1 };
  }

  getUrl() {
    return this.urlApi;
  }

  mensajeNotificacion(plugin, tipo, titulo, mensaje, autoClose = 1) {
    switch (plugin.toLowerCase()) {
      case 'toastr':
        toastr.options.preventDuplicates = true;
        toastr.options.closeButton = true;
        toastr.options.progressBar = true;
        toastr.options.positionClass = 'toast-bottom-center';

        if (autoClose) {
          toastr.options.timeOut = 5000;
          toastr.options.extendedTimeOut = 2000;
        } else {
          toastr.options.timeOut = 0;
          toastr.options.extendedTimeOut = 0;
        }

        switch (tipo.toLowerCase()) {
          case 'success':
            toastr.success(mensaje, titulo);
            break;

          case 'warning':
            toastr.warning(mensaje, titulo);
            break;

          case 'error':
            toastr.error(mensaje, titulo);
            break;

          case 'info':
            toastr.info(mensaje, titulo);
            break;
        }
        break;

      case 'swal':
        swal({
          title: titulo,
          text: mensaje,
          type: tipo,
          animation: false
        });
        break;
    }
  }

  verifyMobile() {
    this.deviceInfo = this.deviceDetectorService.getDeviceInfo();
    const isMobile = this.deviceDetectorService.isMobile();
    const isTablet = this.deviceDetectorService.isTablet();
    const isDesktopDevice = this.deviceDetectorService.isDesktop();

    if (isMobile || isTablet) {
      this.deviceInfo = '';
      return true;
    } else {
      this.deviceInfo = '';
      return false;
    }
  }

  verifyScreenWidth() {
    let typeDevice = '';

    if (this.verifyMobile()) {
      typeDevice = 'Mobile';
    } else {
      // this.windowWidth = $(window).width();

      if (this.windowWidth >= this.maxWidthWindow) {
        typeDevice = 'Desktop';
      } else {
        typeDevice = 'Mobile';
      }
    }

    if (typeDevice === 'Desktop') {
      this.topMenuHeight = 70;
    } else {
      this.topMenuHeight = 90;
    }

    return typeDevice;
  }

  getScreenWidth() {
    // return $(window).width();
  }

  getScreeHeight() {
    // return $(window).height();
  }

  detectChangeScreenWidth() {
    let typeDevice;

    /* $(window).resize(() => {
      this.windowWidth = $(window).width();

      if (this.windowWidth > this.maxWidthWindow) {
        typeDevice = 'Desktop';
      } else {
        typeDevice = 'Mobile';
      }

      return typeDevice;
    }); */

    return typeDevice;
  }

  verificarIfNumber(valor) {
    if (!isNaN(parseInt(valor, 10))) {
      if (typeof (parseInt(valor, 10)) === 'number') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  formattedDate(d) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    month = this.addZero(String(month));
    day = this.addZero(String(day));

    return `${day}/${month}/${year}`;
  }

  addZero(i) {
    if (i.length < 2) {
      i = '0' + i;
    }
    return i;
  }

  copyObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  compareFn(optionOne, optionTwo): boolean {
    if (optionOne !== undefined && optionTwo !== undefined) {
      if (optionOne !== null && optionTwo !== null) {
        return JSON.stringify(optionOne) === JSON.stringify(optionTwo);
      }
    }
  }

  removeCaratersSpecial(cadena) {
    let cadenaA = '';

    if (cadena !== undefined && cadena !== null && cadena && typeof (cadena) === 'string') {
      cadenaA = cadena.toLowerCase().replace(/á/gi, 'a');
      cadenaA = cadenaA.replace(/é/gi, 'e');
      cadenaA = cadenaA.replace(/í/gi, 'i');
      cadenaA = cadenaA.replace(/ó/gi, 'o');
      cadenaA = cadenaA.replace(/ú/gi, 'u');
      cadenaA = cadenaA.replace(/ñ/gi, 'n');
    }

    return cadenaA;
  }

  onFocusAutoComplete(event) {
    if (event.target.value.length === 0) {
      document.querySelector(event.target).siblings('button').click();
    }
  }

  getYearsExperience() {
    const currentTime = new Date();
    const yearMin = 0;
    const yearMax = 5;

    const years = [];

    for (let index = yearMin; index <= yearMax; index++) {
      let name = '';

      if (index === 0) {
        name = 'Sin experiencia';
      } else {
        if (index < 5) {
          name = index + ' año';
        } else {
          name = index + ' a más';
        }
      }

      if (index > 1 && index < 5) {
        name += 's';
      }

      years.push({
        year: index,
        name: name
      });
    }

    return years;
  }

  numberWithCommas(x) {
    if (x && x !== null && x !== undefined) {
      const parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.') + '.00';
    } else {
      return 'No definido';
    }
  }

  changeTitle(page) {
    const arrayTittle = this.titleService.getTitle().split(' - ');

    if (arrayTittle[arrayTittle.length - 1] === 'Work that Works') {
      this.tittlePage = arrayTittle[0] + ' - ' + arrayTittle[1] + ' - ' + page;

      this.titleService.setTitle(arrayTittle.join(' - ') + ' - ' + page);
    } else {
      arrayTittle.splice(arrayTittle.length - 1, 1);

      this.tittlePage = arrayTittle[0] + ' - ' + arrayTittle[1] + ' - ' + page;

      this.titleService.setTitle(arrayTittle.join(' - ') + ' - ' + page);
    }
  }

  setPreviousModule(module) {
    if (module) {
      localStorage.setItem('previousModule', JSON.stringify(module));
    }
  }

  getPreviousModule() {
    if ('previousModule' in localStorage) {
      return JSON.parse(localStorage.getItem('previousModule'));
    } else {
      return false;
    }
  }

  removePreviousModule() {
    localStorage.removeItem('previousModule');
  }

  getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  reordenarPalabras(palabras, separador) {
    palabras = palabras.split(separador);

    const array = this.shuffle(palabras);

    return array.join(separador);
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  copyText(val: string, target: string = '') {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    if (target) {
      document.getElementById(target).appendChild(selBox);
    } else {
      document.body.appendChild(selBox);
    }
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyEmail(val: string, target: string = '') {
    if (!environment.production || environment.qa) {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      if (target) {
        document.getElementById(target).appendChild(selBox);
      } else {
        document.body.appendChild(selBox);
      }
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }
  }

  ordenarArrayByKey(array, key, order) {
    if (array.length) {
      const array2 = this.copyObject(array);

      array2.sort((a, b) => {
        if (order === 'asc') {
          if (a[key] > b[key]) {
            return 1;
          }
          if (a[key] < b[key]) {
            return -1;
          }
          return 0;
        } else {
          if (a[key] > b[key]) {
            return -1;
          }
          if (a[key] < b[key]) {
            return 1;
          }
          return 0;
        }
      });

      return array2;
    } else {
      return [];
    }
  }

  editaFecha(fecha, intervalo, dma, separador) {
    separador = separador || '-';
    const arrayFecha = fecha.split(separador);
    let dia = arrayFecha[0];
    let mes = arrayFecha[1];
    let anio = arrayFecha[2];

    const fechaInicial = new Date(anio, mes - 1, dia);
    const fechaFinal = fechaInicial;
    if (dma === 'm' || dma === 'M') {
      fechaFinal.setMonth(fechaInicial.getMonth() + parseInt(intervalo, 10));
    } else if (dma === 'y' || dma === 'Y') {
      fechaFinal.setFullYear(fechaInicial.getFullYear() + parseInt(intervalo, 10));
    } else if (dma === 'd' || dma === 'D') {
      fechaFinal.setDate(fechaInicial.getDate() + parseInt(intervalo, 10));
    } else {
      return fecha;
    }
    dia = fechaFinal.getDate();
    mes = fechaFinal.getMonth() + 1;
    anio = fechaFinal.getFullYear();

    dia = (dia.toString().length === 1) ? '0' + dia.toString() : dia;
    mes = (mes.toString().length === 1) ? '0' + mes.toString() : mes;

    return dia + separador + mes + separador + anio;
  }

  preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.returnValue = false;
  }

  preventDefaultForScrollKeys(e) {
    if (this.keysScroll[e.keyCode]) {
      this.preventDefault(e);
      return false;
    }
  }

  disableScroll() {
    if (window.addEventListener) { // older FF
      window.addEventListener('DOMMouseScroll', this.preventDefault, false);
    }

    window.onwheel = this.preventDefault; // modern standard
    // window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
    window.ontouchmove = this.preventDefault; // mobile
    document.onkeydown = this.preventDefaultForScrollKeys;
  }

  enableScroll() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
    }

    // window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  }

  getJSONPhoneNumber(phone) {
    let ph;

    if (phone) {
      const mas = phone.indexOf('+');

      if (mas >= 0) {
        phone = phone.substring(mas + 1, phone.length);
      }

      const menos = phone.indexOf('-');
      let code = '';
      let number = '';

      if (menos >= 0) {
        code = '+' + phone.substring(0, menos);
        number = phone.substring(menos + 1, phone.length);
      } else {
        code = '+51';
        number = phone;
      }

      ph = {
        code: code,
        number: number
      };
    } else {
      ph = {
        code: '+51',
        number: ''
      };
    }

    return ph;
  }

  pipeDate(dateInput) {
    const date = dateInput.split('T')[0].replace(/-/g, '/');
    const time = dateInput.split('T')[1];
    const brokenTime = new Date(dateInput);
    const hours = brokenTime.getHours();
    const minutes = brokenTime.getMinutes();
    const seconds = brokenTime.getSeconds();

    return new Date(date);
  }

  now() {
    const date = new Date();
    const aaaa = date.getFullYear().toString();
    let gg = date.getDate().toString();
    let mm = (date.getMonth() + 1).toString();

    if (parseInt(gg, 10) < 10) {
      gg = '0' + gg;
    }

    if (parseInt(mm, 10) < 10) {
      mm = '0' + mm;
    }

    const cur_day = aaaa + '-' + mm + '-' + gg;

    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    let seconds = date.getSeconds().toString();

    if (parseInt(hours, 10) < 10) {
      hours = '0' + hours;
    }

    if (parseInt(minutes, 10) < 10) {
      minutes = '0' + minutes;
    }

    if (parseInt(seconds, 10) < 10) {
      seconds = '0' + seconds;
    }

    return cur_day + ' ' + hours + ':' + minutes + ':' + seconds;
  }

  getErrorHTTP(error) {
    if (error.status !== 429) {
      // this.router.navigate(['/']);
    }
  }

  setTitleCase(cadena) {
    const arrayPalabras = cadena.trim().toLowerCase().split(' ');

    for (let index = 0; index < arrayPalabras.length; index++) {
      const element = arrayPalabras[index];

      switch (true) {
        case
          (
            element !== 'de' &&
            element !== 'al' &&
            element !== 'con' &&
            element !== 'del' &&
            element !== 'y' &&
            element !== 'o' &&
            element !== 'u' &&
            element !== 'a' &&
            element !== 'e' &&
            element !== 'la' &&
            element !== 'en' &&
            element !== 'las'
          ) ||
          index === 0:
          arrayPalabras[index] = element.charAt(0).toUpperCase() + element.slice(1);
          break;
      }
    }

    return arrayPalabras.join(' ');
  }

  getDiferenceInDays(theDate) {
    const dias = Math.abs(new Date().getTime() - new Date(theDate).getTime()) / (1000 * 60 * 60 * 24);

    switch (true) {
      case Math.round(dias) < 1:
        return 'Hoy';
        break;
      case Math.round(dias) === 1:
        return 'hace ' + Math.round(dias) + ' día';
        break;
      case Math.round(dias) > 1:
        return 'hace ' + Math.round(dias) + ' días';
        break;
    }
  }

  titleCase(str) {
    // Step 1. Lowercase the string
    str = str.toLowerCase();
    // str = "I'm a little tea pot".toLowerCase();
    // str = "i'm a little tea pot";

    // Step 2. Split the string into an array of strings
    str = str.split(' ');
    // str = "i'm a little tea pot".split(' ');
    // str = ["i'm", "a", "little", "tea", "pot"];

    // Step 3. Create the FOR loop
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      /* Here str.length = 5
        1st iteration: str[0] = str[0].charAt(0).toUpperCase() + str[0].slice(1);
                       str[0] = "i'm".charAt(0).toUpperCase()  + "i'm".slice(1);
                       str[0] = "I"                            + "'m";
                       str[0] = "I'm";
        2nd iteration: str[1] = str[1].charAt(0).toUpperCase() + str[1].slice(1);
                       str[1] = "a".charAt(0).toUpperCase()    + "a".slice(1);
                       str[1] = "A"                            + "";
                       str[1] = "A";
        3rd iteration: str[2] = str[2].charAt(0).toUpperCase()   + str[2].slice(1);
                       str[2] = "little".charAt(0).toUpperCase() + "little".slice(1);
                       str[2] = "L"                              + "ittle";
                       str[2] = "Little";
        4th iteration: str[3] = str[3].charAt(0).toUpperCase() + str[3].slice(1);
                       str[3] = "tea".charAt(0).toUpperCase()  + "tea".slice(1);
                       str[3] = "T"                            + "ea";
                       str[3] = "Tea";
        5th iteration: str[4] = str[4].charAt(0).toUpperCase() + str[4].slice(1);
                       str[4] = "pot".charAt(0).toUpperCase() + "pot".slice(1);
                       str[4] = "P"                           + "ot";
                       str[4] = "Pot";                                                         
        End of the FOR Loop*/
    }

    // Step 4. Return the output
    return str.join(' '); // ["I'm", "A", "Little", "Tea", "Pot"].join(' ') => "I'm A Little Tea Pot"
  }
}
