import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from './../../../services/snackbar.service';
import { CriptografiaService } from './../../../services/criptografia.service';
import axios from 'axios';
import { LogoutService } from 'src/app/services/logout.service';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-dashboard-aluno',
  templateUrl: './dashboard-aluno.component.html',
  styleUrls: ['./dashboard-aluno.component.scss']
})
export class DashboardAlunoComponent implements OnInit {

  user = {
    Nome: "",
    Ano: "",
    RA: "",
    Level: "",
  }

  tarefas: []

  constructor(
    private router: Router, 
    private snackbar:SnackbarService,
    private criptoService: CriptografiaService,
    private sair: LogoutService,
    private apiService: ApiServiceService
    ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("logSession") !== null){
      if ((localStorage.getItem("Raw_Data")) === 'undefined' || !localStorage.getItem("Raw_Data")){
        this.router.navigate(['/'])
        this.snackbar.error('Dados inválidos!')
      }

      let rawData = this.criptoService.descriptografar(localStorage.getItem('Raw_Data'), 'md5')
      let jsonData = JSON.parse(rawData)
      
      this.user = {
        Nome: jsonData.nome,
        Ano: jsonData.grade,
        Level: jsonData.level,
        RA: jsonData.ra,
      }

      this.snackbar.success('Bem-vindo ' + this.user.Nome + '!')
    } else {
      this.router.navigate(['/'])
    }

    this.getTarefas()
  }

  // * Pegando as tarefas
  async getTarefas(){
    await axios.get('http://localhost:9090/alunos/tarefas/tarefaspendentes')
    .then((data) => {
      this.tarefas = data.data;
    })
  }

  async concluirTarefa(id){
    await this.apiService.EnviarTarefa(id)
  }

  logout(){
    this.sair.logout()
  }
}
