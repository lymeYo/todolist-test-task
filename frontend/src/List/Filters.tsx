const Filters = ({ todosViewMode, setTodosViewMode }) => {
   return (
    <nav>
    <div className='state-list'>
      <button
        onClick={() => {setTodosViewMode('all')}}
        className={`${todosViewMode == 'all' ? 'active' : ''} state-list__item`}>Все</button>
      <button
        onClick={() => {setTodosViewMode('active')}}
        className={`${todosViewMode == 'active' ? 'active' : ''} state-list__item`}>Активные</button>
      <button
        onClick={() => {setTodosViewMode('completed')}}
        className={`${todosViewMode == 'completed' ? 'active' : ''} state-list__item`}>Выполненные</button>
    </div>
</nav>
   )
}
export default Filters