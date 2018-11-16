import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from  '@ionic/storage';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private url:string = "http://localhost:3000/historico";
  public static lista = Array();
  public dados:Array<{}>;
    public evento = {
      "placa": 0,
      "perimetroI": 0,
      "perimetroE": 0,
      "diametroI": 0,
      "diametroE": 0,
      "volumeI": 0,
      "espE": 0
    }
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public toastCtrl: ToastController,
              public storage: Storage) {

                this.storage.get('items').then(res => {
                  if (res != null){
                    HomePage.lista = res;
                  }
                })
              
  }
  
  Cadastrar(evento){

    var qnt = evento.placa;
    
    var pi = qnt * 2.18;
    var pe = pi + 0.314;

    var di = pi / 3.14;
    var de = di + 0.10;

    var t = parseInt(qnt) + 1;
    var esp = 31.4 / t;

    var r = di / 2;
    var volume = (3.14 * r * r * 1.10) * 1000;

    evento.perimetroI = pi.toFixed(2);
    evento.perimetroE = pe.toFixed(2);
    evento.diametroI = di.toFixed(2);
    evento.diametroE = de.toFixed(2);
    evento.espE = esp.toFixed(2);
    evento.volumeI = volume.toFixed(2);


    let i = 0

    if( HomePage.lista.push({
        "placa": evento.placa,
        "perimetroI": evento.perimetroI,
        "perimetroE": evento.perimetroE,
        "diametroI": evento.diametroI,
        "diametroE": evento.diametroE, 
        "volumeI": evento.volumeI,
        "espE": evento.espE}) > 5){

      HomePage.lista.splice(0, 1);
    }
    
    this.storage.set("items", HomePage.lista)

  }
}
