import React from 'react'
import { Card, CardContent } from '../ui/card'

type AnalyticCardProps = {
    title: string;
    icon: React.ReactNode;
    color?: string;
    prefix?: string;
    suffix?: string;
    value: number | string;
}

const getIcon = ({ icon, color }: { icon: React.ReactNode, color: string }) => {
    return React.cloneElement(icon as React.ReactElement, {
        className: `h-5 w-5 text-${color}-600`
    });
}
const AnalyticCard = ({ title, icon, prefix, suffix, value, color }: AnalyticCardProps) => {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${color}-100 rounded-lg`}>
                        {getIcon({ icon, color: color || 'blue' })}
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">{title}</p>
                        <p className={`text-2xl font-bold text-${color}-600`}>{prefix}{value}{suffix}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default AnalyticCard
