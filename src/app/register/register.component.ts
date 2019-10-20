import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from './register.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface UserData {
  phone: number;
  cpf: number;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    phone: new FormControl(''),
    password: new FormControl(''),
    cpf: new FormControl(''),
    imei: new FormControl(''),
    iccid: new FormControl('')
  });

  registered: boolean;
  showModal: boolean;
  lgpdText: string;
  isChecked: boolean;

  @ViewChild('check') check: ElementRef;
  @ViewChild('lgpd') lgpd: ElementRef;

  constructor(
    private registerService: RegisterService,
    private http: HttpClient
  ) {
    this.lgpdText = `
      <div class=WordSection1>
      <p class=MsoNormal style='margin-bottom:9.0pt;text-align:justify;line-height:
      normal;mso-outline-level:1;background:white;vertical-align:baseline'><b><span
      style='font-size:22.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-font-kerning:18.0pt;mso-fareast-language:
      PT-BR'>Política de privacidade na internet da TIM<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:#F2F2F2;vertical-align:middle'><span
      style='font-size:1.0pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>&nbsp;<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;
      margin-left:18.0pt;margin-bottom:.0001pt;text-align:justify;text-indent:-18.0pt;
      line-height:normal;mso-list:l1 level1 lfo2;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:10.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR'><span
      style='mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#4B4B4B;mso-fareast-language:
      PT-BR'>A TIM respeita seus direitos de privacidade. Esta política resume quais
      informações de identificação pessoal podemos coletar, armazenar, guardar e
      tratar, e como podemos usar estas informações. Esta política também descreve
      outros tópicos importantes com relação à sua privacidade.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l1 level1 lfo2;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Política de privacidade na internet da TIM<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>Cabe à TIM cumprir
      com todas as leis de privacidade e proteção de dados em vigor. Este
      comprometimento reflete a importância que damos para ganhar e manter a
      confiança de nossos funcionários, clientes, parceiros de negócios e outros que
      partilham suas informações conosco.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>Esta Política de Privacidade (esta
      &quot;política&quot;) descreve como a TIM protege sua privacidade ao coletar
      suas informações pessoais nos sites da TIM. &nbsp;Como usado nesta política, o
      termo &quot;informação pessoal&quot; significa a informação, isolada ou
      conjuntamente com outras informações que nos são disponíveis pelo seu cadastro
      ou acesso aos nossos sites e que possa(m) lhe identificar e individualizar.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>Esta política se aplica, em geral, a
      todos sites na internet operados pela ou em nome da TIM e suas empresas em todo
      o mundo (cada uma um &quot;site TIM&quot;).<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l1 level1 lfo2;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Declarações de privacidade do website<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>Embora esta
      política se aplique a todos os sites da internet da <span class=SpellE>TIMe</span>
      das suas empresas em todo o mundo, cada site TIM tem um propósito diferente e
      características diferentes. Se outras, ou diferentes, &nbsp;termos e condições
      forem necessárias com relação a um site TIM específico ou ainda para
      cumprimento de legislação de um país estas serão fornecidas no próprio site ou
      em uma declaração específica de privacidade de website (&quot;Declaração de
      privacidade de website&quot;) postada no site em questão &nbsp;Cada termos e
      condições individuais ou declaração de privacidade de website complementa e
      adita esta política, mas apenas com relação ao site TIM no país específico no
      qual está publicada.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l1 level1 lfo2;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Seu consentimento<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>Ao usar o <span
      class=GramE>site &nbsp;TIM</span> ou nos <span class=SpellE>fornecer</span>
      informação pessoal, você está de acordo com a coleta, armazenamento, guarda,
      tratamento, uso e divulgação de sua informação pessoal como descrito nesta
      política e qualquer política de privacidade de país ou Declaração de
      privacidade de website que se aplique.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>Se você não concorda com a coleta,
      armazenamento, guarda, tratamento, uso e divulgação de sua informação pessoal
      como descrito <span class=GramE>nesta &nbsp;política</span> (e qualquer
      política de privacidade de país ou Declaração de privacidade de website que se
      aplique), não use os sites &nbsp;TIM, ou seus &nbsp;formulários do Fale com a TIM.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l1 level1 lfo2;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Limitações à coleta, armazenamento, guarda,
      tratamento, uso e divulgação de informação pessoal<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><b><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>Limitações à coleta</span></b><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>, armazenamento,
      guarda, tratamento,&nbsp;<b>uso e divulgação de informação pessoal</b><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'><br>
      Até onde exija a legislação que se aplica, sempre que a TIM coletar informação
      pessoal em um site TIM, a TIM irá:<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><br>
      &nbsp;• oferecer a você tempestiva e adequadamente &nbsp;comunicação sobre as
      nossas práticas com dados pessoais;<br>
      &nbsp;• coletar, armazenar, guardar, tratar, usar, divulgar e/ou transferir sua
      informação pessoal apenas com sua permissão expressa, dependendo da natureza da
      informação pessoal, requisitos legais e outros fatores;<br>
      &nbsp;• coletar sua informação pessoal apenas para propósitos específicos e
      limitados. A informação pessoal que coletarmos, armazenarmos, guardarmos,
      tratarmos, usarmos e divulgarmos <span class=SpellE>será</span> necessárias,
      adequadas e não excessivas para os propósitos para os quais forem coletadas;<br>
      &nbsp;• processar sua informação pessoal de forma consistente com os propósitos
      para os quais ela foi originalmente coletada, ou para os quais você nos deu
      permissão;<br>
      &nbsp;• tomar medidas razoáveis do ponto de vista comercial para garantir que
      sua informação pessoal seja fidedigna para a utilização pretendida, exata,
      completa e, quando necessário, atualizada.<br>
      &nbsp;• &nbsp;</span><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:blue;mso-fareast-language:PT-BR'>fazer
      uso de sua informação pessoal com propósitos de Marketing Direto (entende-se
      por marketing direto, envio de “newsletter”, e-mail marketing, promoções,
      pesquisa, etc.) somente com sua autorização expressa, através de “<span
      class=SpellE>opt-in</span>” disponível no site TIM;<br>
      •&nbsp;&nbsp; &nbsp;Cessar o uso de informação pessoal com propósitos de
      Marketing Direto, de acordo com sua manifestação através de “<span
      class=SpellE>opt-out</span>’ no site TIM, ou por outro meio de fácil acesso;<br>
      •&nbsp;&nbsp; &nbsp;Excluir da base de dados da TIM, sua informação pessoal,
      dependendo de sua natureza, observado todavia a legislação aplicável ou ainda
      determinações de autoridades administrativa e/ou judicial quanto à guarda e
      preservação para fins legais; e</span><span style='font-size:10.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'><br>
      &nbsp;<br>
      &nbsp;• tomar medidas apropriadas, por contrato ou outra forma admitida em lei,
      para fornecer proteção adequada à informação pessoal que for divulgada a
      terceiros ou transferida para outro país, incluindo transferências dentro da TIM.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>A informação pessoal coletada no site
      TIM será armazenada em um servidor da TIM ou de terceiro por ela contratado,
      nos Estados Unidos da América.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l1 level1 lfo2;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Informação coletada nos sites da TIM e como ela
      pode ser usada.<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>Quando você acessa
      e usa um site TIM, há 3 maneiras que podemos coletar informação sobre você:<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>1. Informação enviada para nós por
      seu browser da web.<br>
      A TIM coleta informação que nos é enviada <span class=SpellE>automáticamente</span>
      por seu browser da web. Esta informação em geral inclui o endereço IP do seu
      provedor de internet, data e horário que você acessou e desconectou do site TIM,
      o nome do sistema operacional (como Macintosh® ou Windows®<span class=GramE>),
      &nbsp;o</span> nome da versão do seu browser (como Internet Explorer® ou
      Netscape®). A informação que recebemos depende das configurações do seu browser
      da web. Favor checar o seu browser se desejar saber quais informações o mesmo
      envia e como mudar suas configurações.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>A informação enviada por seu browser
      não o identifica pessoalmente. Usamos esta informação para criar estatísticas
      que nos ajudam a melhorar nossos sites e torná-los mais compatíveis com a
      tecnologia usada por nossos visitantes da web.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>2. Informação recebida ao colocar um
      “Cookie” em seu computador<br>
      A TIM pode obter informação sobre você ao instalar uma &quot;tag&quot; no disco
      rígido de seu computador. Essa tag é conhecida como &quot;cookie&quot;.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>Todos os sites TIM usam &quot;sessões
      cookie&quot;. &nbsp; Uma sessão cookie é usada para colocar uma tag em seu
      computador com uma identificação única, gerada por computador, quando você
      acessa o site. Uma sessão cookie não lhe reconhece pessoalmente e expira quando
      você fecha seu browser. Usamos sessões cookie para coletar informações
      estatísticas sobre os meios que os visitantes usam nossos sites - que páginas
      visitam, que links usam, e por quanto tempo ficam em cada página. <span
      class=SpellE>Analizamos</span> esta informação (conhecida como &quot;<span
      class=SpellE>clickstream</span> data&quot;) de forma estatística para entender
      melhor os interesses e necessidades de nossos visitantes, para melhor o
      conteúdo e funcionalidade de nossos sites.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>Alguns sites TIM também <span
      class=GramE>usam &nbsp;&quot;</span>cookies persistentes&quot;. Estes cookies
      não expiram quando você fecha seu browser, mas ficam em seu computador até que
      você os exclua. Ao atribuir um identificador único ao seu computador, podemos
      criar uma base de dados de suas antigas escolhas e preferências e em situações
      aonde estas escolhas ou preferências precisem ser coletadas mais de uma vez,
      podem nos ser fornecidas <span class=SpellE>automáticamente</span>, poupando
      seu tempo e esforço. Por exemplo, após fazer uma compra, se você decidir fazer
      outra compra, seu endereço de entrega terá sido retido e precisará apenas ser
      confirmado. Se um site TIM usa &quot;cookies persistentes&quot;, iremos lhe
      notificar na no site TIM que acessar<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>Se você não deseja receber cookies,
      pode alterar o seu browser para que este os rejeite ou o alerte quando um
      cookie for colocado em seu computador. Embora não seja obrigatório que você
      aceite <span class=GramE>o cookies</span> para acessar um site TIM, você pode
      não conseguir usar todas as funcionalidades do site se seu browser rejeitar
      cookies.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>3. Informação que você oferece de
      forma consciente e voluntária<br>
      A TIM coleta informação que você oferece de forma consciente e voluntária,
      quando você usa um site TIM, por exemplo, a informação que você fornece ao <span
      class=SpellE>logar</span> no site para receber alertas de <span class=SpellE>email</span>,
      quando completa uma pesquisa, ou quando nos faz uma pergunta ou nos envia um <span
      class=SpellE>email</span> com feedback. Em muitos casos, essa informação será
      informação pessoal.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>A TIM usa esta informação para os
      propósitos que você a fornece. Por exemplo, se você fornecer um endereço de <span
      class=SpellE>email</span> ao <span class=SpellE>logar-se</span> ao site para
      receber alertas de <span class=SpellE>email</span>, usamos seu <span
      class=SpellE>email</span> para enviar os alertas que pediu.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>Podemos também usar a informação que
      coletamos nos sites TIM para vários propósitos comerciais, como atendimento ao
      cliente, <span class=SpellE>preveção</span> de fraude, pesquisa de marketing,
      melhorar nossos produtos e serviços e fornecer a você e sua empresa informações
      e ofertas que acreditamos que lhes interessarão. Podemos também remover toda
      informação de identificação pessoal e usar o resto para propósitos históricos,
      estatísticos ou científicos.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>Muitos dos sites TIM permitem que
      você faça escolhas sobre o uso da sua informação pessoal. Na maioria dos casos,
      pedimos que indique suas escolhas na hora e na página aonde você fornece sua
      informação pessoal.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l1 level1 lfo2;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Compartilhamento da informação pessoal<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>A TIM não irá <span
      class=GramE>vender &nbsp;informação</span> pessoal coletada dos seus sites da
      internet para corretores de listas de <span class=SpellE>email</span> sem seu
      expresso consentimento.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>A TIM pode compartilhar sua
      informação pessoal com outras unidades de negócios da TIM. Quando fizermos
      isto, as outras unidades de negócios da TIM irão usar sua informação pessoal de
      maneira consistente com os <span class=SpellE>proprósitos</span> para os quais
      ela foi originalmente coletada (ou para os quais você concordou) e apenas como
      permitido por esta política, outras Declarações de privacidade de website ou de
      países, e todas as leis de privacidade e proteção de dados aplicáveis.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>A TIM pode também compartilhar sua
      informação pessoal com terceiros que contratamos para nos prestar serviços de
      suporte. Estes terceiros são <span class=GramE>requeridos &nbsp;a</span> usarem
      a informação pessoal que compartilharmos com eles apenas para prestarem os
      serviços que contratamos, em nosso nome e tratarem sua informação pessoal como
      estritamente confidencial.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>Em alguns casos, a TIM pode
      compartilhar sua informação pessoal com terceiros que são nossos parceiros para
      fornecer produtos e serviços a nossos clientes. Quando fazemos isto,
      determinamos que nossos parceiros de negócios usem as informações pessoais que
      partilhamos com eles de maneira consistente com os propósitos para as quais as
      mesmas foram coletadas (ou com os quais você concordou) e apenas como permitido
      por esta política, outras Declarações de privacidade de website ou países, e
      todas as leis de privacidade e proteção de dados aplicáveis.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>Em certas, e limitadas
      circunstâncias, podemos compartilhar ou transferir informação para terceiros
      alheios. Por exemplo, podemos fornecer informação pessoal para terceiros (i) sob
      seu pedido; (<span class=SpellE>ii</span>) para cumprir com requisitos legais
      ou ordem judicial; (<span class=SpellE>iii</span>) para investigar um possível
      crime, como roubo de identidade; (<span class=SpellE>iv</span>) em <span
      class=SpellE>conecção</span> com a venda, compra, fusão, reorganização,
      liquidação ou dissolução da TIM ou de uma unidade de negócios da TIM; ou (v) em
      <span class=SpellE>circumstâncias</span> similares. Se tal evento ocorrer,
      iremos tomar as medidas apropriadas para proteger sua informação pessoal.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>Muitos dos sites TIM permitem que
      você escolha sobre a divulgação e/ou transferência de suas informações
      pessoais. Na maioria dos casos, pedimos que indique (“<span class=SpellE>opt-in</span>”)
      suas escolhas na hora e na página aonde você fornece sua informação pessoal.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l1 level1 lfo2;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Segurança de informações pessoais<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>Sua informação
      pessoal será geralmente guardada em bases de dados da TIM ou em bases de dados
      mantidas por nossos fornecedores de serviços. A maioria destas bases de dados é
      mantida em servidores localizados nos Estados Unidos. No que legislação
      específica e local exigir, se suas informações pessoais forem transferidas para
      um outro país, um aviso apropriado lhe será enviado.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:12.0pt;margin-right:0cm;margin-bottom:
      0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal;
      background:white;vertical-align:baseline'><span style='font-size:10.5pt;
      font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
      color:#4B4B4B;mso-fareast-language:PT-BR'>A TIM adota medidas de segurança
      razoáveis para proteger a confidencialidade, segurança e integridade da sua
      informação pessoal. Por exemplo, usamos a tecnologia <span class=SpellE>secure</span>
      socket <span class=SpellE>layer</span> (SSL) para transferir informação pessoal
      na internet. Embora usemos medidas de segurança para ajudar a proteger sua
      informação pessoal contra divulgação não autorizada, mau uso ou alteração, como
      é o caso com todos os computadores ligados à internet, não podemos garantir a
      segurança da informação fornecida pela internet, e não nos responsabilizamos
      por falhas na segurança que estejam além do nosso controle <span class=SpellE>razolável</span>.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l1 level1 lfo2;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Links para sites de terceiros<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>Os sites TIM podem
      conter links para sites que não são operados pela TIM. Estes links são
      fornecidos como um serviço e não implicam em nenhum endosso das atividades ou <span
      class=SpellE>conteúdos</span> dos mesmos pela TIM, ou associação com seus
      operadores. A TIM não controla estes sites e não é responsável por seu
      conteúdo, <span class=SpellE>seguraça</span> ou práticas de privacidade.
      Pedimos a você que releia a declaração de privacidade publicada nos sites que
      visita antes de usar os mesmos ou fornecer informação pessoal.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l1 level1 lfo2;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Acesso à informação pessoal<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>Você pode rever,
      corrigir e atualizar sua informação pessoal que forneceu a um site TIM contando
      o Fale com a TIM pelo e-mail falecomaTIM@tim.com ou telefone 0800 013 23 33.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='text-align:justify;line-height:normal;background:
      white;vertical-align:baseline'><span style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l0 level1 lfo3;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Guarda de informação pessoal<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>A TIM guarda
      informação pessoal coletada em seus sites pelo tempo necessários para fornecer
      nossos serviços, produtos e informação que você tenha pedido, como permitido
      pelas leis vigentes.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:blue;mso-fareast-language:PT-BR'>A TIM guarda o
      endereço IP do seu provedor de internet, data e horário que você acessou e
      desconectou do site TIM por 1 (um) ano da coleta da informação.</span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:blue;mso-fareast-language:PT-BR'>Demais informação
      pessoal que você forneceu voluntariamente nos termos desta política, Declaração
      de privacidade em website ou países, e leis aplicáveis, são guardadas pelo
      tempo que se fizerem necessárias para cumprimento legal, determinação judicial,
      por decisão da TIM ou até que você se manifeste pela sua exclusão.</span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l0 level1 lfo3;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Crianças e pais<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>Os sites de TIM não
      são, em geral, destinados a pessoas menores de 13 anos. A TIM não solicita ou
      coleta conscientemente informação de ou sobre crianças em seus sites exceto
      como permitido pelas leis vigentes. Se seu filho(a) fornecer informação pessoal
      e você quiser que tal informação seja excluída de nossas bases de dados, você
      pode fazer esta solicitação usando os mecanismos de feedback fornecidos em um
      site da TIM, clicando neste link de feedback ou escrevendo para nós em TIM,
      Global Internet <span class=SpellE>Privacy</span> <span class=SpellE>Policy</span>,
      Business <span class=SpellE>Conduct</span> <span class=SpellE>and</span> <span
      class=SpellE>Compliance</span>, 220-11W-02, TIM Center, TIM <span class=SpellE>Company</span>,
      St. Paul, MN 55144-1000.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l0 level1 lfo3;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Perguntas sobre esta política e nossas Declarações
      de privacidade<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>Se tiver perguntas
      sobre esta política ou uma Declaração de privacidade de website ou país, ou
      sobre o uso de sua informação pessoal pela TIM, favor entrar em contato conosco
      através do Fale com a TIM pelo e-mail falecomaTIM@mmm.com ou telefone 0800 013
      23 33<o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:9.0pt;
      margin-left:18.0pt;text-align:justify;text-indent:-18.0pt;line-height:normal;
      mso-outline-level:3;mso-list:l0 level1 lfo3;tab-stops:list 36.0pt;background:
      white;vertical-align:baseline'><![if !supportLists]><span style='font-size:
      10.0pt;mso-bidi-font-size:13.5pt;font-family:Symbol;mso-fareast-font-family:
      Symbol;mso-bidi-font-family:Symbol;color:#4B4B4B;mso-fareast-language:PT-BR;
      mso-bidi-font-weight:bold'><span style='mso-list:Ignore'>·<span
      style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span></span></span><![endif]><b><span style='font-size:13.5pt;font-family:
      "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#4B4B4B;
      mso-fareast-language:PT-BR'>Mudanças à esta política e às nossas Declarações de
      privacidade<o:p></o:p></span></b></p>
      
      <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
      justify;line-height:normal;background:white;vertical-align:baseline'><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'>A TIM reserva o
      direito de atualizar ou modificar esta política a qualquer momento, publicando
      uma versão atualizada da mesma no site TIM. Também nos reservamos ao direito de
      atualizar ou modificar uma Declaração de privacidade de website ou de um país,
      a qualquer momento, publicando uma versão atualizada da mesma em nossos sites TIM.
      Se modificarmos esta política ou qualquer Declaração de privacidade, as
      modificações só se aplicarão às informações pessoais que coletarmos após a
      publicação da versão revisada desta política ou da Declaração de privacidade do
      website ou do país a que estas se refiram.<o:p></o:p></span></p>
      
      <p class=MsoNormal style='text-align:justify;line-height:normal;background:
      white;vertical-align:baseline'><span style='color:black;mso-color-alt:windowtext'><a
      href="https://www.3m.com.br/3M/pt_BR/3m-do-brasil/politica-de-privacidade/#MMM--TopJumpMenu"
      target="_self"><span style='font-size:10.5pt;font-family:"Arial",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#0033CC;mso-fareast-language:
      PT-BR;text-decoration:none;text-underline:none'>Voltar ao topo</span></a></span><span
      style='font-size:10.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
      "Times New Roman";color:#4B4B4B;mso-fareast-language:PT-BR'><o:p></o:p></span></p>
      
      <p class=MsoNormal style='text-align:justify'><o:p>&nbsp;</o:p></p>
      
      </div>
    
`;
  }

  ngOnInit() {
    this.setPhoneNumber();
  }

  setCheck() {
    this.isChecked = !this.isChecked;

    if (this.isChecked) {
      this.lgpd.nativeElement.style.color = 'white';
    }

    this.check.nativeElement.style.visibility = this.isChecked ? 'unset' : 'hidden';
  }

  register(userData: UserData) {
    if (!this.isChecked) {
      this.lgpd.nativeElement.style.color = 'red';
      return;
    }

    const params = this.getParams();
    this.http.post(`${ environment.API }/auth`, userData).subscribe(
      res => {
        console.log(params.registered ? 'Verificação bem sucedida' : 'Cadastro bem sucedido.')
        window.location.href = params.target;
      },
      err => console.error(err)
    );
  }

  getParams() {
    const params = {} as any;
    window.location.href
      .split('?')[1]
      .split('&')
      .map(str => str.split('=').map(str => str.replace(/%3D/g, '=').replace(/%2F/g, '/')))
      .forEach(pair => params[pair[0]] = pair[1] === 'true' ? true : (pair[1] === 'false' ? false : pair[1]));
    this.registered = params.registered;
    return params;
  }

  setShowModal(value: boolean) {
    this.showModal = value;
  }

  private setPhoneNumber() {
    const params = this.getParams();
    this.registerForm.patchValue({
      phone: atob(params.phone),
      imei: params.imei,
      iccid: params.iccid
    });
  }

}
