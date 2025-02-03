import { useNavigate } from 'react-router-dom'
const Login = () => {
    const Navigate = useNavigate()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Login Logic
        // Redirect to Home
        return Navigate('/dashboard')
    }
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center items-center bg-gray-100 p-10 rounded-lg">
            <div className="p-10 rounded-lg">
                <h1 className="text-2xl font-bold mb-5">Login</h1>
                <form onSubmit={handleSubmit}>   
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="mt-1 p-2 w-96 border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" className="mt-1 p-2 w-96 border border-gray-300 rounded-md" />
                    </div>
                    {/* Select User Type Login if Admin or Student */}
                    <div className="mb-5">
                        <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Organization</label>
                        <select name="userType" id="userType" className="mt-1 p-2 w-fit border border-gray-300 rounded-md">
                            <option value="admin">Employee</option>
                            <option value="student">Incubatee</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <button type="submit" className="bg-blue-950 hover:bg-blue-900 text-white p-2 rounded-lg w-96">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)
}

export default Login