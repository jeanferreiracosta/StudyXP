import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-criar-tarefa',
  templateUrl: './criar-tarefa.component.html',
  styleUrls: ['./criar-tarefa.component.scss']
})
export class CriarTarefaComponent implements OnInit {
  tarefaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: DialogService,
    private apiService: ApiServiceService
  ) { }

  ngOnInit(): void {
    this.tarefaForm = this.fb.group ({
      titulo: ["", [Validators.required]],
      descricao: ["", [Validators.required]],
      limite_data: ["", [Validators.required]],
      xp: ["", [Validators.required]],
      classe: ["", [Validators.required]],
      flag: "pendente"
    })
  }

  async enviarTarefa(){
    console.log(this.tarefaForm.value)
    await axios.post("http://localhost:9090/professores/tarefas/create", this.tarefaForm.value);
    this.apiService.refresh()
  }
}
