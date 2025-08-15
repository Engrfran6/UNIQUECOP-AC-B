"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useAdmin} from "@/contexts/AdminContext";

const CustomersView = () => {
  const {customers} = useAdmin();
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Customer Management ({customers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {customer.displayName || "Anonymous User"}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Email:</span> {customer.email}
                    </p>
                    <p>
                      <span className="font-medium">Joined:</span>{" "}
                      {customer.createdAt.toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Orders:</span> {customer.totalOrders} |
                      <span className="font-medium"> Spent:</span> ${customer.totalSpent.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
export default CustomersView;
