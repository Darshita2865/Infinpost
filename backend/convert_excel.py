import pandas as pd
import os


excel_file = r"C:\Users\Darshita\Downloads\archive\linkedin_job_posts_insights.xlsx"
csv_file = r"C:\Users\Darshita\Desktop\infinpost\datasets\linkedin_post.csv"

print("🔄 Converting Excel to CSV...")

try:
    
    df = pd.read_excel(excel_file)
    print(f"✅ Read {len(df)} rows from Excel")
    
    df['platform'] = 'linkedin'
    
    df.to_csv(csv_file, index=False)
    print(f"✅ Saved to: {csv_file}")
    print(f"📊 Columns: {df.columns.tolist()}")
    print(f"📈 First 5 rows:\n{df.head()}")
    
except FileNotFoundError:
    print(f"❌ Excel file not found at: {excel_file}")
    print("📁 Please check the file path")
except Exception as e:
    print(f"❌ Error: {e}")
