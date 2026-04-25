import { useState, useEffect } from 'react'
import axios from 'axios'
import { LayoutDashboard, Receipt, Settings, RefreshCw, LogIn } from 'lucide-react'
import Dashboard from './components/Dashboard'
import TransactionList from './components/TransactionList'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [syncing, setSyncing] = useState(false)
  const [summary, setSummary] = useState<any[]>([])

  const fetchSummary = async () => {
    try {
      const res = await axios.get('/api/summary')
      setSummary(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [])

  const handleSync = async () => {
    setSyncing(true)
    try {
      await axios.post('/api/sync')
      fetchSummary()
      alert('Sync completed!')
    } catch (err) {
      alert('Sync failed. Please check your connection or auth.')
    } finally {
      setSyncing(false)
    }
  }

  const handleConnect = async () => {
    try {
      const res = await axios.get('/api/auth/google/url')
      window.location.href = res.data.url
    } catch (err) {
      alert('Failed to get auth URL')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Finance Tracker</h1>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${activeTab === 'transactions' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''}`}
          >
            <Receipt className="w-5 h-5 mr-3" />
            Transactions
          </button>
          <div className="px-6 py-4 mt-auto">
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync Gmail'}
            </button>
            <button
              onClick={handleConnect}
              className="flex items-center justify-center w-full px-4 py-2 mt-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Connect Gmail
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h2>
        </header>
        <main className="p-6">
          {activeTab === 'dashboard' ? <Dashboard summary={summary} /> : <TransactionList />}
        </main>
      </div>
    </div>
  )
}

export default App
