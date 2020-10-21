// using Entity frameworkCore
import React, {Component} from 'react';
import './titulo.css';

// Criada uma function pois renderiza somente html
// Class pedido : Base
// this => base, no caso o titulo
// Passamos uma informação de um componente ao outro
class  Titulo extends Component{
        render(){
            return(
                <div className= 'background-color'>
                    <h1>{this.props.texto}</h1> 

                    {/* if(this.props.descricao !== underfined){
                        this.props.descricao
                    } else{
                        "Descrição não Informada"
                    }*/}
                    
                    <h3>{this.props.descricao || "Descrição não Informada"}</h3>
                </div>
            )
        }

}

//Deixa o wb components visivel a outros components
export default Titulo;