export default function NovaAtividade() {
    return (
        <div>
            <h1>Nova Atividade</h1>
            <form action="">
                <label htmlFor="titulo">Titulo</label>
                <input type="text" name="titulo" id="titulo" />
                <br />
                <label htmlFor="titulo">descrição</label>
                <input type="text" name="titulo" id="titulo" />
                <br />
                <label htmlFor="titulo">Data Limite</label>
                <input type="datetime-local" name="titulo" id="titulo" />
                <br />
                <label htmlFor="">Tarefa Diaria</label>
                <input type="checkbox" name="" id="" />
                <br />
                <button>Criar atividade</button>
            </form>
        </div>
    );
}