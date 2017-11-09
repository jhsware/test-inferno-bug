import Inferno from 'inferno'
import { Provider } from 'inferno-mobx'

import { Router, Route } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory'

import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

import { observable, action } from 'mobx'

/**
 * Store
 */

class SearchStore {
  @observable query = undefined

  @action doSearch(search) {
    this.query = search
  }
}

/**
 * Page
 */

@connect(['searchStore'])
class SearchPage extends Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
  }
  
  componentWillReceiveProps (nextProps) {
    const query = nextProps.params.q
    this.props.searchStore.doSearch(query)
  }

  doSearch (e) {
    e.preventDefault()
    const loc = this.context.router.location
    const nextLoc = loc.pathname + '?q=test'
    this.context.router.push(nextLoc)
  }

  render ({ searchStore }) {

    let showView = searchStore['query'] ? 'results' : 'default'

    return (
      <div key="search-container">
        <a href="#front" onClick={this.doSearch}>Show 'content'...</a>
        {showView === 'default' && <div key="search-default">default (click the link above to show 'content')</div>}
        {showView === 'results' && <SearchResult key="search-results" />}
      </div>
    )
  }
}

class SearchResult extends Component {
  render () {
    return <div key={this.props.key}>
      content (console will show error, now you can't navigate back because state is messed up)
    </div>
  }
}

/**
 * Routing
 */

const searchStore = new SearchStore()
const browserHistory = createBrowserHistory()

const appRoutes = (
  <Provider searchStore={searchStore}>
    <Router history={ browserHistory }>
      <Route path="/" component={ SearchPage } />
    </Router>
  </Provider>
)

try {
  require('inferno-devtools')
} catch (e) {
  console.log("Couldn't load inferno devtools")
}
Inferno.render(appRoutes, document.getElementById('app'))
