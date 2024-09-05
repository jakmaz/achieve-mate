import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  userId: string;
  gameName: string;
}

export default function Breadcrumbs({ userId, gameName }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-2xl">
        <BreadcrumbItem>
          <BreadcrumbLink href={`/user/${userId}`}>{userId}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="mx-2">/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{gameName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
