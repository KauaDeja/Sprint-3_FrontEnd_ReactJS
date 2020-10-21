import React, { Component } from 'react';
import Menu  from '../../components/menu';
import Jumbotron from '../../components/jumbotron';


class Filmes extends Component{


    constructor(){
        // super ativa mais algumas funcionalidades
        super();

        // estado do componente Filmes
        // string user {get; set;} = 'https://5f7f7f14d6aabe00166f064d.mockapi.io/api/filmes'
        // object[] filmes {get; set;}
        this.state = {
            url : 'https://5f7f7f14d6aabe00166f064d.mockapi.io/api/filmes',
            filmes : [],
            id : '',
            nome: '',
            categoria: '',
            anoLancamento: ''
        }
    }
    componentDidMount(){
        this.listar();
    }

    listar(){

        fetch(this.state.url,{
            method : 'GET'

          })
          .then( response => response.json()) // ocorreu pego o response do json
          .then( dados =>{

            this.setState({

                filmes : dados,id : '',
                id : '',
                nome: '',
                categoria: '',
                anoLancamento: ''
            });

           


          })
           // dados pego as informações do retorno
          .catch(err => console.error(err));
    }

    remover(event){
        event.preventDefault();

        fetch(this.state.url + '/' + event.target.value, {
            method : 'DELETE'
          })
          .then( response => response.json()) // ocorreu pego o response do json
          .then( dados =>{
            alert("Filme Removido");
            this.listar();
          })
          .catch(err => console.error(err));
    }
    
    editar(objetoClicado){
        objetoClicado.preventDefault();


        fetch(this.state.url + '/' + objetoClicado.target.value,{
            method : 'GET'
          })
          .then( response => response.json()) // ocorreu pego o response do json
          .then( dado =>{
            this.setState({id : dado.id});
            this.setState({nome : dado.nome});
            this.setState({categoria : dado.categoria});
            this.setState({anoLancamento : dado.anoLancamento});
            
          })
          .catch(err => console.error(err));
    }
    
    salvar(event) {
        event.preventDefault();

        const filme = {
            nome : this.state.nome,
            categoria : this.state.categoria,
            anoLancamento : this.state.anoLancamento,
        }

        //pego o valor do campo filmeId no documento
        let filmeId = this.state.id;
        //if ternário, testa a condição, se válida ? senão :
        let method = (filmeId === "" ? 'POST' : 'PUT');
        let urlRequest = (filmeId === "" ? this.state.url : this.state.url + '/' + filmeId);

          fetch(urlRequest,{
            method : method,
            body : JSON.stringify(filme),
            headers : {
              'content-type' : 'application/json'
            }

          })
          .then( response => response.json()) // ocorreu pego o response do json
          .then(dado => {
            alert('Filme salvo');

            this.listar();
          })
          .catch(err => console.error(err));
    }

    limparCampos(event){
        this.setState({
            id : '',
            nome: '',
            categoria: '',
            anoLancamento: ''
        })
    }

    setNome(event){
        event.preventDefault();

        this.setState({nome : event.target.value});


    }

    render (){
        return(
            <div>
                <Menu/>
                <Jumbotron titulo= 'Filmes' descricao= 'Gerencie seus filmes'/>

                <div className="container">
                    <div className="bd-example" >
                    <form id="formFilme" onSubmit={this.salvar.bind(this)}>
                        <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" className="form-control" id="nome" value={this.state.nome} onChange={this.setNome.bind(this)} aria-describedby="nome" placeholder="Informe o Nome" />                        </div>
                        <div className="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <input type="text" className="form-control" id="categoria" value={this.state.categoria} onChange={event => this.setState({categoria : event.target.value})} placeholder="Informe a Categoria" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ano">Ano de Lançamento</label>
                            <input type="text" className="form-control small" id="anoLancamento" value={this.state.anoLancamento} onChange={event => this.setState({anoLancamento : event.target.value})} placeholder="Informe o Ano de Lançamento" />
                        </div>
                        <button type="button" onClick= {this.limparCampos.bind(this)} className="btn btn-secondary">Cancelar</button>
                        <button type="submit" className="btn btn-success">Salvar</button>
                    </form>

                    <table className="table" style={{marginTop : '40px'}}>
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Ano Lançamento</th>
                            <th scope="col">Ações</th>
                            <th scope="col"><button type="reset" onClick= {this.limparCampos.bind(this)} className="btn btn-primary" >Novo Filme</button></th>
                        </tr>
                        </thead>
                        <tbody id="tabela-lista-corpo">
                            {
                                this.state.filmes.map( item => {
                                    return (
                                        <tr key ={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nome}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.anoLancamento}</td>
                                        <td>
                                            <button type= "button" className="btn btn-danger" value ={item.id} onClick= {this.remover.bind(this)}> Remover</button> {/* this = button */}
                                            <button type= "button" className="btn btn-warning"value ={item.id} onClick= {this.editar.bind(this)}>Editar</button>
                                        </td>

                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Filmes;