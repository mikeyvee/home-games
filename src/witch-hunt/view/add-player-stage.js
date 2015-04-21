import React from 'react'
import formatMessage from 'format-message'
import PlayerPicker from '../../player/picker'

export default React.createClass({
  displayName: 'AddPlayerStage',

  propTypes: {
    app: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired
  },

  render () {
    const app = this.props.app
    const store = this.props.game.store
    const currentPlayer = app.getCurrentPlayer()
    const isPlaying = store.isPlaying(currentPlayer && currentPlayer.id)
    const isReady = store.isReady(currentPlayer && currentPlayer.id)
    const addPlayer = app.actions.witchHunt.addPlayer
    const ready = app.actions.witchHunt.ready
    return (
      <div>
        <h2>{ formatMessage('Choose Players') }</h2>
        <p>
          { formatMessage('The game will begin once everyone has chosen their player.') }
        </p>
        <PlayerPicker
          players={ app.stores.player.state.players }
          selectedId={ app.stores.player.state.selectedId }
          select={ app.actions.player.select }
        />
        { !isPlaying &&
          <button
            onClick={ currentPlayer && addPlayer.partial(currentPlayer) }
            disabled={ !currentPlayer }
          >
            { formatMessage('Join Game') }
          </button>
        }
        { isPlaying && (
            isReady ?
            formatMessage('Waiting for players...') :
            <button onClick={ ready.partial(currentPlayer.id) }>
              { formatMessage('I’m Ready') }
            </button>
          )
        }
      </div>
    )
  }
})
