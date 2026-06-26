import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LoginForm from "@/components/admin/LoginForm";
import ProductTable from "@/components/admin/ProductTable";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    return <LoginForm />;
  }

  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="min-h-screen bg-white text-black font-mono p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-black pb-3">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wide">Admin Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">{products.length} product(s) in database</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="text-xs underline hover:no-underline"
            >
              View shop →
            </a>
            <LogoutButton />
          </div>
        </div>

        <ProductTable products={products} />
      </div>
    </div>
  );
}
