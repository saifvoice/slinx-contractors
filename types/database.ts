export type UserRole = "admin" | "staff" | "client";
export type ServiceCategoryDb = "ict" | "renewable_energy";
export type ContentStatus = "draft" | "published" | "archived";
export type JobDepartment = "ICT" | "Renewable Energy" | "Operations";
export type JobType = "Full-time" | "Contract";
export type JobStatus = "open" | "closed";
export type ApplicationStatus = "new" | "reviewing" | "interview" | "rejected" | "hired";
export type QuoteRequestStatus = "new" | "contacted" | "quoted" | "won" | "lost";
export type ContactMessageStatus = "new" | "read" | "replied";
export type QuoteStatus = "draft" | "sent" | "accepted" | "declined";
export type InvoiceStatus = "unpaid" | "paid" | "overdue" | "void";
export type ServiceArea = "ict" | "renewable-energy" | "both";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: UserRole;
          company: string | null;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { id: string; email: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: ServiceCategoryDb;
          icon: string;
          summary: string;
          description: string;
          capabilities: string[];
          status: ContentStatus;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]> & {
          slug: string;
          title: string;
          category: ServiceCategoryDb;
          summary: string;
          description: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          client_name: string;
          location: string;
          industry: ServiceCategoryDb;
          category: string;
          summary: string;
          description: string;
          timeline: string | null;
          technologies: string[];
          results: string[];
          cover_image_url: string | null;
          status: ContentStatus;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["projects"]["Row"]> & {
          slug: string;
          title: string;
          client_name: string;
          location: string;
          industry: ServiceCategoryDb;
          category: string;
          summary: string;
          description: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
      };
      project_services: {
        Row: { project_id: string; service_id: string };
        Insert: { project_id: string; service_id: string };
        Update: Partial<{ project_id: string; service_id: string }>;
      };
      project_gallery: {
        Row: {
          id: string;
          project_id: string;
          image_url: string;
          caption: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["project_gallery"]["Row"]> & {
          project_id: string;
          image_url: string;
        };
        Update: Partial<Database["public"]["Tables"]["project_gallery"]["Row"]>;
      };
      blog_categories: {
        Row: { id: string; name: string; slug: string };
        Insert: { id?: string; name: string; slug: string };
        Update: Partial<{ name: string; slug: string }>;
      };
      blog_tags: {
        Row: { id: string; name: string; slug: string };
        Insert: { id?: string; name: string; slug: string };
        Update: Partial<{ name: string; slug: string }>;
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          cover_image_url: string | null;
          category_id: string | null;
          author_id: string | null;
          status: ContentStatus;
          read_time: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]> & {
          slug: string;
          title: string;
          excerpt: string;
          content: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]>;
      };
      blog_post_tags: {
        Row: { post_id: string; tag_id: string };
        Insert: { post_id: string; tag_id: string };
        Update: Partial<{ post_id: string; tag_id: string }>;
      };
      blog_comments: {
        Row: {
          id: string;
          post_id: string;
          author_name: string;
          author_email: string;
          body: string;
          is_approved: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["blog_comments"]["Row"]> & {
          post_id: string;
          author_name: string;
          author_email: string;
          body: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_comments"]["Row"]>;
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          author_name: string;
          author_role: string;
          company: string | null;
          avatar_url: string | null;
          is_featured: boolean;
          sort_order: number;
          status: ContentStatus;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["testimonials"]["Row"]> & {
          quote: string;
          author_name: string;
          author_role: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
      };
      jobs: {
        Row: {
          id: string;
          slug: string;
          title: string;
          department: JobDepartment;
          location: string;
          type: JobType;
          summary: string;
          responsibilities: string[];
          requirements: string[];
          status: JobStatus;
          posted_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["jobs"]["Row"]> & {
          slug: string;
          title: string;
          department: JobDepartment;
          location: string;
          type: JobType;
          summary: string;
        };
        Update: Partial<Database["public"]["Tables"]["jobs"]["Row"]>;
      };
      job_applications: {
        Row: {
          id: string;
          job_id: string;
          full_name: string;
          email: string;
          phone: string;
          linkedin_url: string | null;
          cover_note: string;
          cv_url: string | null;
          status: ApplicationStatus;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["job_applications"]["Row"]> & {
          job_id: string;
          full_name: string;
          email: string;
          phone: string;
          cover_note: string;
        };
        Update: Partial<Database["public"]["Tables"]["job_applications"]["Row"]>;
      };
      quote_requests: {
        Row: {
          id: string;
          name: string;
          company: string | null;
          email: string;
          phone: string;
          service: ServiceArea;
          budget: string | null;
          message: string;
          status: QuoteRequestStatus;
          assigned_to: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["quote_requests"]["Row"]> & {
          name: string;
          email: string;
          phone: string;
          service: ServiceArea;
          message: string;
        };
        Update: Partial<Database["public"]["Tables"]["quote_requests"]["Row"]>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status: ContactMessageStatus;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["contact_messages"]["Row"]> & {
          name: string;
          email: string;
          subject: string;
          message: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Row"]>;
      };
      media_library: {
        Row: {
          id: string;
          file_name: string;
          file_url: string;
          file_type: string;
          file_size_bytes: number | null;
          alt_text: string | null;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["media_library"]["Row"]> & {
          file_name: string;
          file_url: string;
          file_type: string;
        };
        Update: Partial<Database["public"]["Tables"]["media_library"]["Row"]>;
      };
      site_settings: {
        Row: { key: string; value: unknown; updated_at: string; updated_by: string | null };
        Insert: { key: string; value: unknown; updated_by?: string | null };
        Update: Partial<{ value: unknown; updated_by: string | null }>;
      };
      quotes: {
        Row: {
          id: string;
          client_id: string;
          project_title: string;
          line_items: unknown;
          amount: number;
          currency: string;
          status: QuoteStatus;
          valid_until: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["quotes"]["Row"]> & {
          client_id: string;
          project_title: string;
          amount: number;
        };
        Update: Partial<Database["public"]["Tables"]["quotes"]["Row"]>;
      };
      invoices: {
        Row: {
          id: string;
          client_id: string;
          quote_id: string | null;
          invoice_number: string;
          amount: number;
          currency: string;
          status: InvoiceStatus;
          due_date: string | null;
          issued_at: string;
          paid_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["invoices"]["Row"]> & {
          client_id: string;
          invoice_number: string;
          amount: number;
        };
        Update: Partial<Database["public"]["Tables"]["invoices"]["Row"]>;
      };
      downloads: {
        Row: {
          id: string;
          client_id: string;
          file_name: string;
          file_url: string;
          category: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["downloads"]["Row"]> & {
          client_id: string;
          file_name: string;
          file_url: string;
        };
        Update: Partial<Database["public"]["Tables"]["downloads"]["Row"]>;
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          recipient_id: string;
          subject: string | null;
          body: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["messages"]["Row"]> & {
          sender_id: string;
          recipient_id: string;
          body: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Row"]>;
      };
    };
  };
}
