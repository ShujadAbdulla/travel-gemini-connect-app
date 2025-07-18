export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      booking_stats: {
        Row: {
          cancelled_bookings: number
          completed_bookings: number
          id: string
          pending_bookings: number
          total_bookings: number
          total_revenue: number
          updated_at: string
        }
        Insert: {
          cancelled_bookings?: number
          completed_bookings?: number
          id?: string
          pending_bookings?: number
          total_bookings?: number
          total_revenue?: number
          updated_at?: string
        }
        Update: {
          cancelled_bookings?: number
          completed_bookings?: number
          id?: string
          pending_bookings?: number
          total_bookings?: number
          total_revenue?: number
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          address: string
          booking_date: string
          created_at: string
          id: string
          nurse_id: string | null
          patient_id: string
          special_instructions: string | null
          status: string
          symptoms: string | null
          updated_at: string
        }
        Insert: {
          address: string
          booking_date: string
          created_at?: string
          id?: string
          nurse_id?: string | null
          patient_id: string
          special_instructions?: string | null
          status?: string
          symptoms?: string | null
          updated_at?: string
        }
        Update: {
          address?: string
          booking_date?: string
          created_at?: string
          id?: string
          nurse_id?: string | null
          patient_id?: string
          special_instructions?: string | null
          status?: string
          symptoms?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      daily_booking_metrics: {
        Row: {
          bookings_count: number
          created_at: string
          date: string
          id: string
          revenue: number
          updated_at: string
        }
        Insert: {
          bookings_count?: number
          created_at?: string
          date: string
          id?: string
          revenue?: number
          updated_at?: string
        }
        Update: {
          bookings_count?: number
          created_at?: string
          date?: string
          id?: string
          revenue?: number
          updated_at?: string
        }
        Relationships: []
      }
      nurse_performance: {
        Row: {
          average_rating: number | null
          completed_bookings: number
          id: string
          nurse_id: string
          total_bookings: number
          total_earnings: number
          updated_at: string
        }
        Insert: {
          average_rating?: number | null
          completed_bookings?: number
          id?: string
          nurse_id: string
          total_bookings?: number
          total_earnings?: number
          updated_at?: string
        }
        Update: {
          average_rating?: number | null
          completed_bookings?: number
          id?: string
          nurse_id?: string
          total_bookings?: number
          total_earnings?: number
          updated_at?: string
        }
        Relationships: []
      }
      nurses: {
        Row: {
          bio: string | null
          created_at: string
          first_name: string
          hourly_rate: number | null
          id: string
          last_name: string
          profile_image_url: string | null
          specialty: string | null
          user_id: string | null
          years_experience: number | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          first_name: string
          hourly_rate?: number | null
          id?: string
          last_name: string
          profile_image_url?: string | null
          specialty?: string | null
          user_id?: string | null
          years_experience?: number | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          first_name?: string
          hourly_rate?: number | null
          id?: string
          last_name?: string
          profile_image_url?: string | null
          specialty?: string | null
          user_id?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id: string
          last_name: string
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
