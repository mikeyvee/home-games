import React from 'react'
import formatMessage from 'format-message'

export default React.createClass({
  displayName: 'PlayerView',

  propTypes: {
    app: React.PropTypes.object.isRequired,
    players: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      id: null,
      name: ''
    }
  },

  didChange (event) {
    const target = event.target
    const { name, value } = target
    this.setState({ [name]: value })
  },

  getActions () {
    return this.props.app.actions.player
  },

  render () {
    const { players, selectedId } = this.props.players
    const { select, delete: remove } = this.getActions()
    return (
      <div>
        <h1>{ formatMessage('Players') }</h1>
        { players.map(player =>
          <div key={ player.id }>
            <label>
              <input type='radio'
                onChange={ select.partial(player.id) }
                checked={ player.id === selectedId }
              />
              { player.name }
            </label>
            <button onClick={ this.edit.bind(this, player) }>
              ✎ { formatMessage('Change') }
            </button>
            <button onClick={ remove.partial(player.id) }>
              ⌫ { formatMessage('Remove') }
            </button>
          </div>
        ) }
        <input
          type='text'
          name='name'
          value={ this.state.name }
          onChange={ this.didChange }
        />
        { this.state.id ?
          <button
            disabled={ !this.state.name.trim() }
            onClick={ this.state.name.trim() && this.update }
          >
            { formatMessage('Update') }
          </button>
        :
          <button
            disabled={ !this.state.name.trim() }
            onClick={ this.state.name.trim() && this.create }
          >
            { formatMessage('Create') }
          </button>
        }
      </div>
    )
  },

  create () {
    const create = this.getActions().create
    const player = {
      id: this.props.players.store.nextId(),
      name: this.state.name.trim()
    }
    this.setState(this.getInitialState(), create.partial(player))
  },

  update () {
    const update = this.getActions().update
    const player = {
      id: this.state.id,
      name: this.state.name.trim()
    }
    this.setState(this.getInitialState(), update.partial(player))
  },

  edit (player) {
    const { id, name } = player
    this.setState({ id, name })
  }
})
