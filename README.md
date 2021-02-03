
[//]: <> (*RF* - Requisitos funcionais - funcionalidades que teremos.)

[//]: <> (*RNF* - Requisitos não funcionais - requisitos voltados pra parte técnica, qual lib, banco de dados vamos utilizar etc... Algo que escolhemos utilizar, ex: o envio de email precisa ser feito utilizando a biblioteca nodemailer... )

[//]: <> (*RN* - Regras de negócio)



# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu email
- O usuário deve receber um e-mail com instruções de recuperação de senha
- O usuário deve poder resetar sua senha

**RFN**

- Utilizar Mailtrap pra testar envios em ambiente de dev;
- Utilizar Amazon SES (Simple email service) para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);


**RN**

- O link enviado por e-mail pra resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;



# Atualização do perfil

**RF**

- O usuário deve pode ratualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha o usuário deve informar a senha antiga;
- Para atualizar sua senha precisa confirmar a nova senha;



# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder vizualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;


**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;


# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache

- O que é cache?
(forma de guardar o resultado de alguma visualização, de uma forma que seja possível consumir de uma forma mais rápida) ;


**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h último às 17h)
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
