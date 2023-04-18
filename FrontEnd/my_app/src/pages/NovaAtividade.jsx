export default function NovaAtividade() {

    function handleSubmit(e){
        e.preventDefault()
        console.log()
    }
    return (
        <div>
            <h1>Nova Atividade</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="titulo">Titulo</label>
                <input type="text" name="titulo" id="titulo" />
                <br />
                <label htmlFor="descricao">descrição</label>
                <textarea name="descricao" id="descricao" cols="30" rows="10"></textarea>
                <br />
                <label htmlFor="data_limite">Data Limite</label>
                <input type="datetime-local" name="data_limite" id="data_limite" />
                <br />
                <label htmlFor="tipo">tipo</label>
                <select name="tipo" id="tipo">
                    <option value="1">Escola</option>
                    <option value="2">Trabalho</option>    
                </select>
                <br />
                <label htmlFor="repete">Tarefa Diaria</label>
                <input type="checkbox" name="repete" id="repete" />
                <br />
                <label htmlFor="domingo">domingo</label>
                <input type="checkbox" name="domingo" id="domingo" />
                <label htmlFor="segunda">segunda</label>
                <input type="checkbox" name="segunda" id="segunda" />
                <label htmlFor="terca">terca</label>
                <input type="checkbox" name="terca" id="terca" />
                <label htmlFor="quarta">quarta</label>
                <input type="checkbox" name="quarta" id="quarta" />
                <label htmlFor="quinta">quinta</label>
                <input type="checkbox" name="quinta" id="quinta" />
                <label htmlFor="sexta">sexta</label>
                <input type="checkbox" name="sexta" id="sexta" />
                <label htmlFor="sabado">sabado</label>
                <input type="checkbox" name="sabado" id="sabado" />
                <br />
                <button>Criar atividade</button>
            </form>
        </div>
    );
}