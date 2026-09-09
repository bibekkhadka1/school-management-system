type PageProps = {
  params: Promise<{
    classCode: string;
  }>;
};

export default async function ManageClassPage({ params }: PageProps) {
  const { classCode } = await params;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold">
        Class Management
      </h1>

      <p className="mt-4">
        Class Code: {classCode}
      </p>
    </div>
  );
}