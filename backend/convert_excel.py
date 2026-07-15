import pandas as pd
import os

# Path to your Excel file
excel_file = r"C:\Users\Darshita\Downloads\archive\linkedin_job_posts_insights.xlsx"
csv_file = r"C:\Users\Darshita\Desktop\infinpost\datasets\linkedin_post.csv"

print("🔄 Converting Excel to CSV...")

try:
    # Read the Excel file
    df = pd.read_excel(excel_file)
    print(f"✅ Read {len(df)} rows from Excel")
    
    # Add platform column
    df['platform'] = 'linkedin'
    
    # Save as CSV
    df.to_csv(csv_file, index=False)
    print(f"✅ Saved to: {csv_file}")
    print(f"📊 Columns: {df.columns.tolist()}")
    print(f"📈 First 5 rows:\n{df.head()}")
    
except FileNotFoundError:
    print(f"❌ Excel file not found at: {excel_file}")
    print("📁 Please check the file path")
except Exception as e:
    print(f"❌ Error: {e}")