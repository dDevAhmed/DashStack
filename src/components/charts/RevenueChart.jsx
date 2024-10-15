import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { revenueData } from '../../data/data';
import Card from '../../ui/Card';
import Dropdown from '../../ui/Dropdown';

const RevenueChart = () => {
    return (
        <Card classNames={'px-4 py-5 sm:p-6'} style={{ backgroundColor: '#fff', marginTop: '20px' }}>
            <span className="flex items-center justify-between  mb-5">
                <h3 className="text-brand-primary-black text-[1.125rem] font-semibold">Revenue</h3>
                <Dropdown />
            </span>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF946D" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#BFE8FF" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#42B6F6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#BFE8FF" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} ticks={[20, 40, 60, 80, 100]} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="sales" stroke="#F9978A" fillOpacity={1} fill="url(#sales)" />
                    <Area type="monotone" dataKey="profit" stroke="#E3B9FF" fillOpacity={1} fill="url(#profit)" />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
}

export default RevenueChart;