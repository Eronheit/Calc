import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private url:string = "http://localhost:3000/historico";
  public dados:Array<{}>;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: Http,
              public toastCtrl:ToastController) {

                this.dados = HomePage.lista;

                // this.http.get(this.url)
                // .map( res => res.json() )
                // .subscribe( data => {
                // this.dados = data; console.log(data[3]); });
                

  }
  Delete(id:number){
    this.http.delete(`http://localhost:3000/historico/${id}`)
    .map( res => res.json() )
    .subscribe( data => {
      let toast = this.toastCtrl.create({
        message: 'Música Excluida com Sucesso!!!',
        duration:3000,
        showCloseButton: true,
        closeButtonText: 'OK'
      });
      toast.present();
      this.navCtrl.push(AboutPage);
    });
  }
}
