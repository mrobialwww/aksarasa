import os
import importlib.util

spec = importlib.util.find_spec('tensorflowjs')

if spec is None:
    print('❌ Error: tensorflowjs tidak ditemukan. Pastikan sudah terinstall.')
    exit(1)

package_dir = os.path.dirname(spec.origin)

# Daftar file yang perlu di-patch beserta pola yang harus diganti
patches_per_file = {
    # File 1: tf_saved_model_conversion_v2.py
    os.path.join(package_dir, 'converters', 'tf_saved_model_conversion_v2.py'): [
        (
            'import tensorflow_decision_forests',
            'try:\n    import tensorflow_decision_forests\nexcept Exception:\n    tensorflow_decision_forests = None'
        ),
        (
            'import tensorflow_hub as hub',
            'try:\n    import tensorflow_hub as hub\nexcept Exception:\n    hub = None'
        ),
    ],
    # File 2: converters/__init__.py
    os.path.join(package_dir, 'converters', '__init__.py'): [
        (
            'from tensorflowjs.converters.jax_conversion import convert_jax',
            'try:\n    from tensorflowjs.converters.jax_conversion import convert_jax\nexcept Exception:\n    convert_jax = None'
        ),
    ],
}

total_applied = 0

for filepath, patches in patches_per_file.items():
    print(f'\n📂 File: {filepath}')
    if not os.path.exists(filepath):
        print('   ⚠️  File tidak ditemukan, dilewati.')
        continue
    try:
        with open(filepath, 'r') as f:
            txt = f.read()

        file_changed = False
        for old, new in patches:
            if old in txt and new not in txt:
                txt = txt.replace(old, new)
                print(f'   ✅ Patched     : {old[:55]}...')
                total_applied += 1
                file_changed = True
            elif new in txt:
                print(f'   ✅ Sudah ada   : {old[:55]}...')
            else:
                print(f'   ⚠️  Tidak ditemukan: {old[:55]}...')

        if file_changed:
            with open(filepath, 'w') as f:
                f.write(txt)

    except PermissionError:
        print('   ❌ Tidak ada akses. Coba buka terminal sebagai Administrator.')

print(f'\n✅ Selesai! {total_applied} patch baru diterapkan.')
