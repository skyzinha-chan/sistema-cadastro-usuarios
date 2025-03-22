# Sistema de Cadastro de Usuários em JavaScript

Este projeto consiste em um **sistema de cadastro de usuários** desenvolvido em JavaScript. Ele permite o **armazenamento**, **consulta** e **deleção e atualização de informações pessoais**, utilizando tecnologias modernas e boas práticas de desenvolvimento.

![Tela do Sistema](https://github.com/skyzinha-chan/sistema-cadastro-usuarios/blob/a6de30ff252ec1b5a710bf2bf1193c0973fd990f/src/assets/images/modelo%20cadastro.png)

### Tecnologias Utilizadas
- **HTML**: Criação da interface do usuário.
- **CSS**: Estilização e layout da aplicação.
- **JavaScript**: Implementação da lógica do sistema.
- **localStorage**: Persistência local dos dados no navegador. 
- **Trello**: Utilizado para definir o quadro de estudos e organizar as tarefas do projeto.
- **Jira**: Ferramenta para estruturar a divisão de atividades e acompanhar o progresso do desenvolvimento.

---

## <div align="center"> Estrutura do Projeto

A organização dos arquivos foi planejada para garantir **modularidade** e **manutenibilidade**:

```
/sistema-cadastro-usuarios
├── README.md                    # Documento que descreve o projeto, instruções e informações relevantes
├── index.html                   # Página principal do sistema
├── src/                         # Pasta que contém os arquivos da aplicação                     
│   │       
│   ├── scripts/                 # Pasta JavaScript que contém a lógica de manipulação de dados 
│   │   ├── displayFunctions.js  # Funções para exibir a lista de   pessoas cadastradas 
│   │   ├── domManipulation.js   # Manipulação do DOM 
│   │   ├── eventHandlers.js     # Manipuladores de eventos 
│   │   ├── formValidation.js    # Validação de formulários 
│   │   ├── index.js             # Inicialização da aplicação 
│   │   ├── storageManager.js    # Gerenciamento do localStorage 
│   │   ├── userFactory.js       # Padrão Factory para criação de usuários 
│   │   └── utils.js             # Funções úteis para a aplicação 
│   └── styles/                  # Pasta que contém os arquivos de estilo 
│       └── styles.css           # Estilos CSS para a aplicação.
│   └── assets/
│       └── images               # Imagens do decorrer do processo
```

---
## <div align="center"> Processo de Desenvolvimento

O desenvolvimento seguiu uma abordagem organizada com base em metodologia Scrum, dividindo as funcionalidades em pequenos incrementos.

### Planejamento inicial:
- Foram separadas as operações e definidos os requisitos para cada funcionalidade: criação, consulta, deleção e início da atualização de usuários.

### Criação de estrutura básica:
- Foi desenvolvida uma estrutura HTML simples e um arquivo JavaScript único contendo as primeiras funções estruturadas para manipulação de dados.



### Validação e testes iniciais:
- Identificação de erros ao realizar cadastros sem validação adequada.
- Validação adicionada com expressões regulares e testes extensivos para garantir funcionamento.


### Refinamento e modularização:
- As funções foram separadas em arquivos específicos (e.g., validação, manipulação de eventos) para maior clareza e reutilização.

---

## <div align="center">Desafios Enfrentados e Soluções

### Persistência de Dados no localStorage:
- Dificuldades iniciais em salvar e recuperar dados corretamente.
- **Solução**: Estudo da documentação e revisão cuidadosa do código para corrigir chamadas e sincronização.


### Busca e Exclusão de Usuários:
- Problemas na exibição dos resultados ao buscar usuários cadastrados.
- **Solução**: Revisão da lógica de exibição e refinamento de eventos para garantir respostas mais precisas.


### Usabilidade e Aparência:
- Ajustes na interface para exibir mensagens de erro claras e listas filtradas de resultados.


---

## <div align="center">Melhoria Contínua e Refatoração

Após testes funcionais bem-sucedidos, foram feitas revisões no código para melhorar a eficiência e garantir aderência a convenções JavaScript:
- Identificação e eliminação de duplicações de código.
- Separação de responsabilidades entre módulos.
- Revisão de chamadas de funções e eventos para evitar conflitos.


Observações Finais
Embora a funcionalidade básica do sistema esteja concluída, ainda há oportunidades de melhorias, especialmente na validação avançada e na revisão da lógica de alteração de usuários. Além disso, busco constantemente aprimorar minhas habilidades em JavaScript e boas práticas de desenvolvimento.

### Funcionalidades Implementadas
- **Cadastro de Usuários**: Inserção de dados como nome, data de nascimento, telefone e e-mail.
- **Persistência Local**: Armazenamento seguro no localStorage.
- **Consulta**: Busca e visualização de usuários cadastrados (por nome e e-mail).
- **Deleção**: Remoção eficiente de registros com feedback claro ao usuário.
- **Alteração (em progresso)**: Permite editar informações cadastradas, embora ainda precise de mais testes para assegurar a robustez.


## Como Utilizar o Sistema

Siga as instruções abaixo para executar o projeto:
1. Clone este repositório em sua máquina:
   ```bash
   git clone <URL-do-repositório> 
   ```

2. Abra o arquivo `index.html` em um navegador.
3. Utilize o formulário para cadastrar, consultar, alterar ou deletar usuários.


## <div align="center">Sobre a Autora

### **Talita Mendonça Marques**  
🌐 [GitHub](https://github.com/skyzinha-chan) | [LinkedIn](https://www.linkedin.com/in/talita-mendonca-marques/)  

Desenvolvedora apaixonada por tecnologia e inovação, com foco em criar soluções robustas e eficientes. Comprometida com o aprendizado contínuo e a aplicação de boas práticas de desenvolvimento.




