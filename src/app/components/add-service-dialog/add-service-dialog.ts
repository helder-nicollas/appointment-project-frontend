import { Component, inject } from '@angular/core';
import { DialogHeader } from '../dialog/dialog-header/dialog-header';
import { DialogContent } from '../dialog/dialog-content/dialog-content';
import { Button } from '../button/button';
import { DialogRef } from '@angular/cdk/dialog';
import { Input } from '../input/input';

@Component({
  selector: 'add-service-dialog',
  imports: [DialogHeader, DialogContent, Button, Input],
  standalone: true,
  templateUrl: './add-service-dialog.html',
})
export class AddServiceDialog {
  public dialogRef = inject(DialogRef);

  public services = [
    {
      id: 'srv-001',
      description: 'Manutenção preventiva de sistemas',
      basePrice: 150.0,
    },
    {
      id: 'srv-002',
      description: 'Instalação de software corporativo',
      basePrice: 300.0,
    },
    {
      id: 'srv-003',
      description: 'Suporte técnico remoto',
      basePrice: 120.0,
    },
    {
      id: 'srv-004',
      description: 'Consultoria em infraestrutura de TI',
      basePrice: 450.0,
    },
    {
      id: 'srv-005',
      description: 'Backup e recuperação de dados',
      basePrice: 200.0,
    },
    {
      id: 'srv-006',
      description: 'Auditoria de segurança da informação',
      basePrice: 600.0,
    },
    {
      id: 'srv-007',
      description: 'Monitoramento de servidores',
      basePrice: 180.0,
    },
    {
      id: 'srv-008',
      description: 'Desenvolvimento de funcionalidade sob demanda',
      basePrice: 800.0,
    },
    {
      id: 'srv-009',
      description: 'Treinamento técnico para equipes',
      basePrice: 350.33,
    },
    {
      id: 'srv-010',
      description: 'Otimização de performance de aplicações',
      basePrice: 400.67,
    },
  ];

  public selectService(service: Service) {
    this.dialogRef.close(service);
  }
}
